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
  <RouterView class="text-green-500" />
</template>

<style scoped></style>
