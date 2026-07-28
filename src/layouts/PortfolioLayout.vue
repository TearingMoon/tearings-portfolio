<template>
  <div class="min-w-screen min-h-screen">
    <Transition
      leave-active-class="
        pointer-events-none
        transition-opacity
        duration-500
        delay-150
        motion-reduce:duration-0
        motion-reduce:delay-0
      "
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <IntroOverlay
        v-if="phase === 'intro'"
        class="z-20"
        :progress="progress"
        @skip="skipIntro"
      />
    </Transition>
    <BrandTitle
      :compact="phase !== 'intro'"
      class="z-20"
      @transition-complete="handleTransitionEnd"
    />
    <SceneCanvas
      :reveal-progress="progress"
      :target-shape="targetShape"
      class="z-0"
    />

    <PortfolioNavigation
      class="z-20 transition-[opacity,transform] duration-500"
      :class="
        phase === 'ready'
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      "
      :inert="phase !== 'ready'"
    />
  </div>
</template>

<script setup lang="ts">
import SceneCanvas from "@/components/scene/SceneCanvas.vue";
import IntroOverlay from "@/components/intro/IntroOverlay.vue";
import BrandTitle from "@/components/layout/BrandTitle.vue";
import PortfolioNavigation from "@/components/layout/PortfolioNavigation.vue";
import { usePortfolioIntro } from "@/composables/usePortfolioIntro";
import { computed } from "vue";
import { useRoute } from "vue-router";
import type {
  ContentPosition,
  ContentSurface,
  StarShapeId,
} from "@/router/meta";

const { phase, progress, startIntro, skipIntro, handleTransitionEnd } =
  usePortfolioIntro();

startIntro();

const route = useRoute();

const targetShape = computed<StarShapeId>(() => {
  if (phase.value !== "ready") {
    return "starfield";
  } else {
    return route.meta.starShape ?? "starfield";
  }
});
</script>

<style scoped></style>
