<template>
  <main>
    <!-- CRT lines -->
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <LoadingScreen @finished-loading="hasFinishedLoading = true" v-if="!hasFinishedLoading" />
      <!--  -->
      <SplashScreen v-else-if="!hasFinishedSpash" @finished-splash="hasFinishedSpash = true" />
      <MainMenuScreen v-else />
    </Transition>
  </main>
</template>

<script lang="ts" setup>
import LoadingScreen from '@/components/views/Home/LoadingScreen.vue'
import SplashScreen from '@/components/views/Home/SplashScreen.vue'
import MainMenuScreen from '@/components/views/Home/MainMenuScreen.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const hasFinishedLoading = ref(false)
const hasFinishedSpash = ref(false)
if (route.params.startAnimation) {
  hasFinishedLoading.value = true
  hasFinishedSpash.value = true
}
</script>

<style scoped></style>
