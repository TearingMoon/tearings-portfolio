<script setup lang="ts">
import { shallowRef, watch } from "vue";

import type { StarShapeId } from "@/router/meta";
import { sampleModelPoints } from "@/components/scene/models/sampleModelPoints.ts";

import Starfield from "./Starfield.vue";

interface Props {
  revealProgress: number;
  targetShape: StarShapeId;
}

const props = defineProps<Props>();

const STAR_COUNT = 25000;

const targetPositions = shallowRef<Float32Array | null>(null);

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
  />
</template>
