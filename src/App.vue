<script setup lang="ts">
import { RouterView } from 'vue-router'
import CRTScreenEffect from './components/styling/CRTScreenEffect.vue'

console.log(
  'Hi! if you are reading this, you are awesome! 🚀, the full code of this webpage is in https://github.com/TearingMoon/tearings-portfolio '
)
</script>

<template>
  <CRTScreenEffect>
    <RouterView />
  </CRTScreenEffect>
</template>

<style scoped></style>
