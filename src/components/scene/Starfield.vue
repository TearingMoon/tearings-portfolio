<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { useLoop } from "@tresjs/core";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
} from "three";

const props = withDefaults(
  defineProps<{
    count?: number;
    spread?: number;
    size?: number;
    speed?: number;
    revealDuration?: number;
    active?: boolean;
  }>(),
  {
    count: 2000,
    spread: 30,
    size: 0.04,
    speed: 0.02,
    revealDuration: 3,
    active: false,
  },
);

const emit = defineEmits<{
  revealed: [];
  "update:progress": [progress: number];
}>();

const generationProgress = ref(0);

const geometry = new BufferGeometry();
const positions = new Float32Array(props.count * 3);

for (let index = 0; index < props.count; index += 1) {
  const positionIndex = index * 3;

  positions[positionIndex] = (Math.random() - 0.5) * props.spread;

  positions[positionIndex + 1] = (Math.random() - 0.5) * props.spread;

  positions[positionIndex + 2] = (Math.random() - 0.5) * props.spread;
}

geometry.setAttribute("position", new BufferAttribute(positions, 3));

geometry.setDrawRange(0, 0);

const material = new PointsMaterial({
  color: 0xffffff,
  size: props.size,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
  blending: AdditiveBlending,
});

const Starfield = new Points(geometry, material);

let revealElapsed = 0;
let isRevealing = false;
let hasFinished = false;

watch(
  () => props.active,
  (active) => {
    if (active) {
      startReveal();
    } else {
      resetReveal();
    }
  },
  {
    immediate: true,
  },
);

function setGenerationProgress(progress: number): void {
  generationProgress.value = Math.min(Math.max(progress, 0), 1);

  emit("update:progress", generationProgress.value);
}

function startReveal(): void {
  revealElapsed = 0;
  isRevealing = true;
  hasFinished = false;

  geometry.setDrawRange(0, 0);
  setGenerationProgress(0);
}

function resetReveal(): void {
  revealElapsed = 0;
  isRevealing = false;
  hasFinished = false;

  geometry.setDrawRange(0, 0);
  setGenerationProgress(0);
}

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta, elapsed }) => {
  Starfield.rotation.y += delta * props.speed;

  Starfield.rotation.x = Math.sin(elapsed * 0.1) * 0.03;

  if (!isRevealing) {
    return;
  }

  revealElapsed += delta;

  const progress = Math.min(revealElapsed / props.revealDuration, 1);

  setGenerationProgress(progress);

  const visibleStars = Math.floor(props.count * generationProgress.value);

  geometry.setDrawRange(0, visibleStars);

  if (generationProgress.value >= 1 && !hasFinished) {
    isRevealing = false;
    hasFinished = true;

    emit("revealed");
  }
});

defineExpose({
  generationProgress,
  startReveal,
  resetReveal,
});

onBeforeUnmount(() => {
  geometry.dispose();
  material.dispose();
});
</script>

<template>
  <primitive :object="Starfield" />
</template>
