<template>
  <main>
    <Transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div
        class="w-full h-20 fixed text-white flex flex-row gap-3 items-center justify-center z-20"
        v-if="showHeader"
      >
        <div
          class="flex flex-row gap-3 items-center justify-center bg-neutral-900 px-3 border-2 rounded-2xl border-neutral-700 shadow-md shadow-black"
        >
          <a href="#about" class="hover:underline">About</a>
          <p>//</p>
          <a href="#projects" class="hover:underline">Projects</a>
          <p>//</p>
          <a href="#contact" class="hover:underline">Contact</a>
        </div>
      </div>
    </Transition>
    <WelcomeComponent @animation-end="showHeader = true" />
    <AboutComponent />
    <SectionComponent class="h-screen sm:px-52 py-20"> <LinuxConsoleComponent /> </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import WelcomeComponent from '@/components/views/home/WelcomeComponent.vue'
import AboutComponent from '@/components/views/home/AboutComponent.vue'
import SectionComponent from '@/components/utils/SectionComponent.vue'
import LinuxConsoleComponent from '@/components/views/home/LinuxConsoleComponent.vue'
import { ref } from 'vue'

const showHeader = ref(false)
</script>

<style scoped></style>
