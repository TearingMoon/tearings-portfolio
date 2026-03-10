<script setup lang="ts">
import { RouterView } from 'vue-router'
import CRTScreenEffect from './components/styling/CRTScreenEffect.vue'
import WindowDecorationComponent from './components/common/WindowDecorationComponent.vue'

if (import.meta.env.MODE === 'development') {
  console.log(
    'Development mode is enabled. This is a development build of the portfolio. Please do not use this in production.'
  )
} else {
  console.clear()
  console.log(
    'Hi! if you are reading this, you are awesome! 🚀, the full code of this webpage is in https://github.com/TearingMoon/tearings-portfolio '
  )
}
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <CRTScreenEffect />
  <WindowDecorationComponent />
  <RouterView v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <component :is="Component" id="main-content" />
    </transition>
  </RouterView>
</template>

<style scoped></style>
