<template>
  <SectionComponent
    class="sm:min-h-screen w-full flex flex-col items-center justify-center text-white"
  >
    <div class="sm:h-screen w-full flex flex-col items-center justify-center">
      <h1
        class="text-3xl sm:text-8xl font-bold text-center bg-gradient-to-r from-red-600 via-indigo-500 to-green-400 bg-clip-text text-transparent"
      >
        Full Stack Developer
      </h1>
      <h3 class="sm:text-3xl transition-all duration-300 text-justify">Focused on</h3>
      <div
        class="text-2xl sm:text-6xl font-semibold sm:font-bold sm:text-neutral-700 flex flex-row transition-all duration-300 hover:text-white hover:transform hover:scale-110"
      >
        Scalability
      </div>
      <div
        class="text-2xl sm:text-6xl font-semibold sm:font-bold sm:text-neutral-700 flex flex-row transition-all duration-300 hover:text-white hover:transform hover:scale-110"
      >
        Optimizations
      </div>
      <div
        class="text-2xl sm:text-6xl font-semibold sm:font-bold sm:text-neutral-700 flex flex-row transition-all duration-300 hover:text-white hover:transform hover:scale-110"
      >
        Reliability
      </div>
      0
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '@/components/utils/SectionComponent.vue'
</script>

<style scoped></style>
