<script setup lang="ts">
import { RouterView } from 'vue-router'
import CRTScreenEffect from './components/styling/CRTScreenEffect.vue'

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
  <CRTScreenEffect />
  <RouterView v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style scoped></style>
