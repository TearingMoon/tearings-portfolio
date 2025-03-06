<script setup lang="ts">
import { RouterView } from 'vue-router'
import cursorComponent from '@/components/common/CursorComponent.vue'

console.log(
  'Hi! if you are reading this, you are awesome! 🚀, the full code of this webpage is in https://github.com/TearingMoon/tearings-portfolio '
)
</script>

<template>
  <cursorComponent />
  <RouterView />
</template>

<style scoped></style>
