<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import { useLoop } from "@tresjs/core";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
  Vector3,
} from "three";

import vertexShader from "./shaders/starfield.vert.glsl?raw";
import fragmentShader from "./shaders/starfield.frag.glsl?raw";

interface Props {
  count?: number;
  spread?: number;
  size?: number;
  speed?: number;
  opacity?: number;
  revealProgress: number;
  targetPositions?: Float32Array | null;
  targetOffset?: [number, number, number];
  morphDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 2000,
  spread: 30,
  size: 0.04,
  speed: 0.02,
  opacity: 0.85,
  targetPositions: null,
  morphDuration: 1.5,
  targetOffset: () => [0, 0, 0],
});

const emit = defineEmits<{
  morphStart: [];
  morphComplete: [];
}>();

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function easeInOutCubic(value: number): number {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function createStarfieldPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const maximumRadius = spread / 2;

  for (let index = 0; index < count; index += 1) {
    const positionIndex = index * 3;

    const azimuth = Math.random() * Math.PI * 2;
    const polarCosine = Math.random() * 2 - 1;
    const polarSine = Math.sqrt(1 - polarCosine * polarCosine);

    /**
     * Cube root produces a uniform distribution
     * throughout the sphere's volume.
     */
    const radius = Math.cbrt(Math.random()) * maximumRadius;

    positions[positionIndex] = radius * polarSine * Math.cos(azimuth);

    positions[positionIndex + 1] = radius * polarSine * Math.sin(azimuth);

    positions[positionIndex + 2] = radius * polarCosine;
  }

  return positions;
}

function createRevealThresholds(
  positions: Float32Array,
  count: number,
  spread: number,
): Float32Array {
  const thresholds = new Float32Array(count);
  const maximumRadius = spread / 2;

  for (let index = 0; index < count; index += 1) {
    const positionIndex = index * 3;

    const x = positions[positionIndex];
    const y = positions[positionIndex + 1];
    const z = positions[positionIndex + 2];

    const distance = Math.sqrt(x * x + y * y + z * z);

    const normalizedDistance = distance / maximumRadius;

    /**
     * Small randomness prevents the reveal frontier
     * from looking like a perfectly defined sphere.
     */
    const randomness = (Math.random() - 0.5) * 0.08;

    thresholds[index] = Math.min(
      Math.max(normalizedDistance + randomness, 0),
      0.94,
    );
  }

  return thresholds;
}

function createSizeVariations(count: number): Float32Array {
  const result = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    result[index] = 0.65 + Math.random() * 0.7;
  }

  return result;
}

const initialPositions = createStarfieldPositions(props.count, props.spread);

const sourcePositions = initialPositions.slice();
const morphTargetPositions = initialPositions.slice();

const revealThresholds = createRevealThresholds(
  initialPositions,
  props.count,
  props.spread,
);

const sizeVariations = createSizeVariations(props.count);

const geometry = new BufferGeometry();

const sourcePositionAttribute = new BufferAttribute(sourcePositions, 3);

const targetPositionAttribute = new BufferAttribute(morphTargetPositions, 3);

geometry.setAttribute("position", sourcePositionAttribute);

geometry.setAttribute("aTargetPosition", targetPositionAttribute);

geometry.setAttribute(
  "aRevealThreshold",
  new BufferAttribute(revealThresholds, 1),
);

geometry.setAttribute("aSizeVariation", new BufferAttribute(sizeVariations, 1));

const uniforms = {
  uRevealProgress: {
    value: clamp01(props.revealProgress),
  },
  uMorphProgress: {
    value: 1,
  },
  uPointSize: {
    value: props.size,
  },
  uOpacity: {
    value: props.opacity,
  },
  uSourceOffset: {
    value: new Vector3(0, 0, 0),
  },
  uTargetOffset: {
    value: new Vector3(0, 0, 0),
  },
};

const material = new ShaderMaterial({
  uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  depthWrite: false,
  depthTest: true,
  blending: AdditiveBlending,
  toneMapped: false,
});

const starfield = new Points(geometry, material);

const targetOffsetVector = new Vector3(...props.targetOffset);

/**
 * Morph targets may exceed the original geometry bounds.
 * This prevents incorrect culling during transitions.
 */
starfield.frustumCulled = false;

let morphElapsed = 0;
let currentMorphProgress = 1;
let isMorphing = false;

/**
 * Stores the currently rendered positions as the new source.
 * This allows changing targets halfway through a transition
 * without producing a visual jump.
 */
function bakeCurrentState(): void {
  const progress = currentMorphProgress;

  /**
   * Bake the currently rendered geometry without including
   * translation offsets in the vertex positions.
   */
  for (let index = 0; index < sourcePositions.length; index += 1) {
    const source = sourcePositions[index];
    const target = morphTargetPositions[index];

    sourcePositions[index] = source + (target - source) * progress;
  }

  sourcePositionAttribute.needsUpdate = true;

  /**
   * Bake the currently rendered offset independently from
   * the geometry.
   */
  uniforms.uSourceOffset.value.lerpVectors(
    uniforms.uSourceOffset.value,
    uniforms.uTargetOffset.value,
    progress,
  );
}

function isValidTarget(positions: Float32Array): boolean {
  const expectedLength = props.count * 3;

  if (positions.length === expectedLength) {
    return true;
  }

  console.warn(
    `[Starfield] Invalid target position count. ` +
      `Expected ${expectedLength} values, ` +
      `received ${positions.length}.`,
  );

  return false;
}

function startMorph(
  nextPositions: Float32Array | null,
  nextOffset: [number, number, number] = props.targetOffset,
): void {
  const resolvedTarget = nextPositions ?? initialPositions;

  if (!isValidTarget(resolvedTarget)) {
    return;
  }

  /**
   * Capture the exact currently rendered geometry and offset
   * before changing the destination.
   */
  bakeCurrentState();

  morphTargetPositions.set(resolvedTarget);
  targetPositionAttribute.needsUpdate = true;

  /**
   * The normal starfield always lives at the origin.
   */
  if (nextPositions === null) {
    uniforms.uTargetOffset.value.set(0, 0, 0);
  } else {
    uniforms.uTargetOffset.value.set(
      nextOffset[0],
      nextOffset[1],
      nextOffset[2],
    );
  }

  morphElapsed = 0;
  currentMorphProgress = 0;

  uniforms.uMorphProgress.value = 0;

  isMorphing = true;

  emit("morphStart");
}

function resetToStarfield(): void {
  startMorph(null);
}

watch(
  () => props.revealProgress,
  (progress) => {
    uniforms.uRevealProgress.value = clamp01(progress);
  },
  {
    immediate: true,
  },
);

watch(
  () => props.size,
  (size) => {
    uniforms.uPointSize.value = size;
  },
);

watch(
  () => props.opacity,
  (opacity) => {
    uniforms.uOpacity.value = clamp01(opacity);
  },
);

watch(
  () =>
    [
      props.targetPositions,
      props.targetOffset[0],
      props.targetOffset[1],
      props.targetOffset[2],
    ] as const,
  ([positions, offsetX, offsetY, offsetZ], [previousPositions]) => {
    /**
     * Ignore offset changes while displaying the normal
     * starfield, since it must always remain centered.
     */
    if (positions === null && previousPositions === null) {
      return;
    }

    startMorph(positions ?? null, [offsetX, offsetY, offsetZ]);
  },
);

watch(
  () => props.targetOffset,
  ([x, y, z]) => {
    targetOffsetVector.set(x, y, z);
  },
);

if (props.targetPositions !== null) {
  startMorph(props.targetPositions);
}

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta, elapsed }) => {
  starfield.rotation.y += delta * props.speed;

  starfield.rotation.x = Math.sin(elapsed * 0.1) * 0.03;

  if (!isMorphing) {
    return;
  }

  morphElapsed += delta;

  const normalizedProgress =
    props.morphDuration <= 0
      ? 1
      : Math.min(morphElapsed / props.morphDuration, 1);

  currentMorphProgress = easeInOutCubic(normalizedProgress);

  uniforms.uMorphProgress.value = currentMorphProgress;

  if (normalizedProgress < 1) {
    return;
  }

  currentMorphProgress = 1;
  uniforms.uMorphProgress.value = 1;

  isMorphing = false;

  emit("morphComplete");
});

defineExpose({
  resetToStarfield,
  startMorph,
});

onBeforeUnmount(() => {
  geometry.dispose();
  material.dispose();
});
</script>

<template>
  <primitive :object="starfield" />
</template>
