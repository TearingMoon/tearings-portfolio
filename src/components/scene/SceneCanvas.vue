<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

import type { StarShapeId } from "@/router/meta";

import PortfolioScene from "./PortfolioScene.vue";
import { Vector3 } from "three";

interface Props {
  revealProgress: number;
  targetShape: StarShapeId;
}

defineProps<Props>();
</script>

<template>
  <TresCanvas window-size :clear-alpha="0">
    <TresPerspectiveCamera :position="new Vector3(0, 0, 8)" />

    <PortfolioScene
      :reveal-progress="revealProgress"
      :target-shape="targetShape"
    />
  </TresCanvas>
</template>
