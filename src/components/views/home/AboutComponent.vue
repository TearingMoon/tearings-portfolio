<template>
  <SectionComponent class="h-screen w-full flex flex-col items-center text-white sm:px-52">
    <div
      class=" w-full border-2 border-neutral-800 rounded-2xl shadow-md shadow-black overflow-hidden bg-black"
    >
      <div class="w-full h-10 bg-neutral-700 shadow flex flex-row items-center px-5">
        <h1 class="text-neutral-400 text-lg hidden sm:block">C:/WINDOWS/System32/AboutMe.exe</h1>
        <svg width="40" height="10" xmlns="http://www.w3.org/2000/svg" class="ml-auto">
          <circle cx="5" cy="5" r="5" fill="yellow" />
          <circle cx="20" cy="5" r="5" fill="green" />
          <circle cx="35" cy="5" r="5" fill="red" />
        </svg>
      </div>
      <div class="p-5 sm:p-10 flex flex-col gap-5">
        <h1 class="text-2xl sm:text-4xl font-bold">
          <span class="text-orange-400">$</span> About me <span class="text-purple-400">:</span>
        </h1>
        <p class="text-lg sm:text-2xl">
          I am a software engineer with a passion for analisis, web development and software
          solutions. I have experience in both front-end and back-end development. I am a quick
          learner and I am always looking for new challenges.
        </p>
      </div>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '@/components/utils/SectionComponent.vue'
</script>

<style scoped></style>
