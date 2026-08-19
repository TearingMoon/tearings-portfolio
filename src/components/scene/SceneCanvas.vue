<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

import type { ContentPosition, StarShapeId } from "@/router/meta";

import { CAMERA_FOV, CAMERA_Z } from "./sceneConfig.ts";

import PortfolioScene from "./PortfolioScene.vue";
import { Vector3 } from "three";

interface Props {
  revealProgress: number;
  targetShape: StarShapeId;
  contentPosition: ContentPosition;
}

defineProps<Props>();
</script>

<template>
  <TresCanvas window-size :clear-alpha="0">
    <TresPerspectiveCamera
      :position="new Vector3(0, 0, CAMERA_Z)"
      :fov="CAMERA_FOV"
    />

    <PortfolioScene
      :reveal-progress="revealProgress"
      :target-shape="targetShape"
      :content-position="contentPosition"
    />
  </TresCanvas>
</template>
