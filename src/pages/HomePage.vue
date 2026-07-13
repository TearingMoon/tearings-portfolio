<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainScene from "@/components/scene/MainScene.vue";
import HomeUI from "@/components/home/HomeUI.vue";

const isMainSceneLoaded = ref(false);
const starfieldProgress = ref(0);

onMounted(() => {});

function handleMainSceneLoaded(): void {
  isMainSceneLoaded.value = true;
}
</script>

<template>
  <main class="relative min-h-screen overflow-hidden text-white">
    <HomeUI
      :progress="starfieldProgress"
      :state="isMainSceneLoaded ? 'loaded' : 'loading'"
      class="z-50"
    />

    <MainScene
      v-model:starfield-progress="starfieldProgress"
      @starfield-revealed="handleMainSceneLoaded"
    />

    <div class="absolute w-full h-full flex flex-row z-50">
      <!-- Left Button -->
      <button class="w-1/5 h-full"></button>

      <!-- Center Button -->
      <button class="w-3/5 h-full"></button>

      <!-- Right Button -->
      <button class="w-1/5 h-full"></button>
    </div>
  </main>
</template>
