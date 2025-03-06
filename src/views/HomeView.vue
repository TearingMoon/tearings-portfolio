<template>
  <main>
    <!-- CRT lines -->
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <LoadingScreen @finished-loading="hasFinishedLoading = true" v-if="!hasFinishedLoading" />
      <SplashScreen @finished-splash="hasFinishedSpash = true" v-else-if="!hasFinishedSpash" />
      <MainMenuScreen v-else />
    </Transition>
  </main>
</template>

<script lang="ts" setup>
import LoadingScreen from '@/components/views/Home/LoadingScreen.vue'
import SplashScreen from '@/components/views/Home/SplashScreen.vue'
import MainMenuScreen from '@/components/views/Home/MainMenuScreen.vue'
import { ref } from 'vue'

const hasFinishedLoading = ref(false)
const hasFinishedSpash = ref(false)
</script>

<style scoped></style>
