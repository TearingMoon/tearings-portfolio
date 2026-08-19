<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";

import {
  CAMERA_FOV,
  CAMERA_Z,
  MOBILE_BREAKPOINT,
  MOBILE_HEADER_HEIGHT,
  NAVBAR_HEIGHT,
  TABLET_HEADER_HEIGHT,
} from "./sceneConfig.ts";

import type { ContentPosition, StarShapeId } from "@/router/meta";
import { sampleModelPoints } from "@/components/scene/models/sampleModelPoints.ts";

import Starfield from "./Starfield.vue";

interface Props {
  revealProgress: number;
  targetShape: StarShapeId;
  contentPosition: ContentPosition;
}

const viewportWidth = ref(1280);
const viewportHeight = ref(720);

let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

function updateViewportSize(): void {
  viewportWidth.value = window.innerWidth;
  viewportHeight.value = window.innerHeight;
}

function handleResize(): void {
  if (resizeTimeout !== null) {
    clearTimeout(resizeTimeout);
  }

  resizeTimeout = setTimeout(() => {
    updateViewportSize();
  }, 100);
}

onMounted(() => {
  updateViewportSize();

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  if (resizeTimeout !== null) {
    clearTimeout(resizeTimeout);
  }
});

const isMobile = computed(() => {
  return viewportWidth.value < MOBILE_BREAKPOINT;
});

const viewSize = computed(() => {
  const aspect = viewportWidth.value / viewportHeight.value;

  const fovRadians = (CAMERA_FOV * Math.PI) / 180;

  const visibleHeight = 2 * Math.tan(fovRadians / 2) * CAMERA_Z;

  const visibleWidth = visibleHeight * aspect;

  return {
    width: visibleWidth,
    height: visibleHeight,
  };
});

const targetRadius = computed(() => {
  const positions = targetPositions.value;

  if (!positions) {
    return 0;
  }

  let maximumSquaredDistance = 0;

  for (let index = 0; index < positions.length; index += 3) {
    const x = positions[index];
    const y = positions[index + 1];
    const z = positions[index + 2];

    const squaredDistance = x * x + y * y + z * z;

    maximumSquaredDistance = Math.max(maximumSquaredDistance, squaredDistance);
  }

  return Math.sqrt(maximumSquaredDistance);
});

const availableModelSize = computed(() => {
  const viewportHeightPixels = viewportHeight.value;

  if (isMobile.value) {
    const headerHeight =
      viewportWidth.value >= 640 ? TABLET_HEADER_HEIGHT : MOBILE_HEADER_HEIGHT;

    const usableHeight = Math.max(
      viewportHeightPixels - headerHeight - NAVBAR_HEIGHT,
      0,
    );

    /*
     * The router panel occupies the lower half of the
     * usable area, leaving the upper half for the model.
     */
    const modelRegionHeight = usableHeight * 0.5;

    const worldHeight =
      viewSize.value.height * (modelRegionHeight / viewportHeightPixels);

    /*
     * Keep some margin around the model so point size,
     * rotation and screen edges do not make it feel clipped.
     */
    return {
      width: viewSize.value.width * 0.88,
      height: worldHeight * 0.82,
    };
  }

  /*
   * On desktop the content panel occupies roughly 40%
   * of the width, so reserve the opposite half for the model.
   */
  const usableHeight = Math.max(
    viewportHeightPixels - TABLET_HEADER_HEIGHT - NAVBAR_HEIGHT,
    0,
  );

  return {
    width: viewSize.value.width * 0.52,
    height:
      viewSize.value.height * (usableHeight / viewportHeightPixels) * 0.88,
  };
});

const targetScale = computed(() => {
  if (targetPositions.value === null || targetRadius.value <= 0) {
    return 1;
  }

  const diameter = targetRadius.value * 2;

  const horizontalScale = availableModelSize.value.width / diameter;

  const verticalScale = availableModelSize.value.height / diameter;

  const fittingScale = Math.min(horizontalScale, verticalScale);

  /*
   * Models are already normalized by sampleModelPoints.
   * Do not make them unnecessarily huge on large screens.
   */
  return Math.min(fittingScale, 1);
});

const props = defineProps<Props>();

const STAR_COUNT = 25000;

const targetPositions = shallowRef<Float32Array | null>(null);

const targetOffset = computed<[number, number, number]>(() => {
  if (props.targetShape === "starfield") {
    return [0, 0, 0];
  }

  if (isMobile.value) {
    const headerHeight =
      viewportWidth.value >= 640 ? TABLET_HEADER_HEIGHT : MOBILE_HEADER_HEIGHT;

    const usableHeight = Math.max(
      viewportHeight.value - headerHeight - NAVBAR_HEIGHT,
      0,
    );

    /*
     * The model occupies the upper half of the usable area.
     * Find the vertical center of that region in screen pixels.
     */
    const modelCenterPixels = headerHeight + usableHeight * 0.25;

    /*
     * Convert screen Y into world-space Y.
     */
    const normalizedY = modelCenterPixels / viewportHeight.value;

    const worldY =
      viewSize.value.height * 0.5 - normalizedY * viewSize.value.height;

    return [0, worldY, 0];
  }

  const horizontalOffset = Math.min(
    Math.max(viewSize.value.width * 0.25, 2.2),
    3.4,
  );

  return props.contentPosition === "left"
    ? [horizontalOffset, 0, 0]
    : [-horizontalOffset, 0, 0];
});

const targetRotationSpeed = computed(() => {
  if (props.targetShape === "starfield") {
    return 0.02;
  }

  return 0.15;
});

const shapeCache = new Map<Exclude<StarShapeId, "starfield">, Float32Array>();

interface ShapeDefinition {
  url: string;
  size: number;
}

const shapeDefinitions: Record<
  Exclude<StarShapeId, "starfield">,
  ShapeDefinition
> = {
  profile: {
    url: "/models/Pistol.glb",
    size: 6,
  },
  cube: {
    url: "/models/Pistol.glb",
    size: 6,
  },
  satellite: {
    url: "/models/Pistol.glb",
    size: 6,
  },
};

/**
 * Identifies the latest requested shape.
 * Older asynchronous requests are ignored when they finish.
 */
let requestId = 0;

async function selectShape(shape: StarShapeId): Promise<void> {
  const currentRequestId = ++requestId;

  if (shape === "starfield") {
    targetPositions.value = null;
    return;
  }

  const cachedPositions = shapeCache.get(shape);

  if (cachedPositions) {
    targetPositions.value = cachedPositions;
    return;
  }

  const definition = shapeDefinitions[shape];

  try {
    const positions = await sampleModelPoints(definition.url, {
      count: STAR_COUNT,
      size: definition.size,
    });

    /**
     * Ignore the result if the user navigated elsewhere
     * while this model was loading.
     */
    if (currentRequestId !== requestId) {
      return;
    }

    shapeCache.set(shape, positions);
    targetPositions.value = positions;
  } catch (error) {
    if (currentRequestId !== requestId) {
      return;
    }

    console.error(`Could not load star shape "${shape}".`, error);

    targetPositions.value = null;
  }
}

watch(
  () => props.targetShape,
  (shape) => {
    void selectShape(shape);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Starfield
    :count="STAR_COUNT"
    :reveal-progress="revealProgress"
    :target-positions="targetPositions"
    :morph-duration="1.4"
    :target-offset="targetOffset"
    :speed="targetRotationSpeed"
    :target-scale="targetScale"
  />
</template>
