<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import SceneCanvas from "@/components/scene/SceneCanvas.vue";
import IntroOverlay from "@/components/intro/IntroOverlay.vue";
import BrandTitle from "@/components/layout/BrandTitle.vue";
import PortfolioNavigation from "@/components/layout/PortfolioNavigation.vue";

import { usePortfolioIntro } from "@/composables/usePortfolioIntro";

import type { ContentPosition, StarShapeId } from "@/router/meta";

const { phase, progress, startIntro, skipIntro, handleTransitionEnd } =
  usePortfolioIntro();

const route = useRoute();

const targetShape = computed<StarShapeId>(() => {
  if (phase.value !== "ready") {
    return "starfield";
  }

  return route.meta.starShape ?? "starfield";
});

const contentPosition = computed<ContentPosition>(() => {
  return route.meta.contentPosition ?? "left";
});

/**
 * Both desktop positions use `left` instead of alternating
 * between `left` and `right`, so the position can be animated.
 */
const desktopPanelPosition = computed(() => {
  return contentPosition.value === "right"
    ? "md:left-[calc(60%-1.5rem)]"
    : "md:left-6";
});

const contentSurface = computed(() => {
  return route.meta.contentSurface ?? "glass";
});

onMounted(() => {
  startIntro();
});
</script>

<template>
  <main
    class="relative isolate h-dvh w-full overflow-hidden bg-black [--header-height:5rem] [--navbar-height:5rem] sm:[--header-height:6rem] sm:[--navbar-height:5rem]"
  >
    <!-- Scene -->
    <SceneCanvas
      :reveal-progress="progress"
      :target-shape="targetShape"
      :content-position="contentPosition"
      class="absolute inset-0 z-0"
    />

    <!-- Introduction -->
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
        class="z-30"
        :progress="progress"
        @skip="skipIntro"
      />
    </Transition>

    <!-- Persistent title -->
    <BrandTitle
      :compact="phase !== 'intro'"
      class="z-30"
      @transition-complete="handleTransitionEnd"
    />

    <!--
      Available screen area:
      between BrandTitle and bottom navigation.
    -->
    <div
      class="pointer-events-none absolute inset-x-0 top-(--header-height) bottom-(--navbar-height) z-10"
    >
      <!-- Router panel -->
      <Transition
        enter-active-class="
    transition-[opacity,transform]
    duration-500
    ease-out
    motion-reduce:duration-0
  "
        enter-from-class="opacity-0 scale-y-0"
        enter-to-class="opacity-100 scale-y-100"
        leave-active-class="
    transition-[opacity,transform]
    duration-300
    ease-in
    motion-reduce:duration-0
  "
        leave-from-class="opacity-100 scale-y-100"
        leave-to-class="opacity-0 scale-y-0"
      >
        <div
          v-if="phase === 'ready'"
          class="pointer-events-auto absolute bottom-0 left-4 right-4 h-1/2 origin-bottom transition-[left] duration-500 ease-in-out md:top-1/2 md:bottom-auto md:right-auto md:h-2/3 md:w-2/5 md:-translate-y-1/2"
          :class="desktopPanelPosition"
        >
          <!-- Visual surface -->
          <Transition
            enter-active-class="
        transition-opacity
        duration-500
        ease-out
      "
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="
        transition-opacity
        duration-500
        ease-in
      "
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="contentSurface === 'glass'"
              class="pointer-events-none absolute inset-0 rounded-lg border border-white/20 bg-black/10 backdrop-blur-md"
            />
          </Transition>

          <!-- Route content -->
          <div class="relative z-10 h-full overflow-hidden rounded-lg">
            <RouterView v-slot="{ Component, route: currentRoute }">
              <Transition
                mode="out-in"
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <component
                  :is="Component"
                  :key="currentRoute.fullPath"
                  class="h-full"
                />
              </Transition>
            </RouterView>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Persistent bottom navigation -->
    <PortfolioNavigation
      class="absolute inset-x-0 bottom-0 z-20 h-(--navbar-height) transition-[opacity,transform] duration-500"
      :class="
        phase === 'ready'
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      "
      :inert="phase !== 'ready'"
    />
  </main>
</template>
