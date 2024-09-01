<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import cursorComponent from '@/components/common/CursorComponent.vue'
</script>

<template>
  <cursorComponent />
  <HeaderComponent />
  <RouterView />
</template>

<style scoped></style>
