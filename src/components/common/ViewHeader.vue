<template>
  <div class="text-center border-b border-green-500 pb-4">
    <h1 class="text-3xl sm:text-5xl font-bold mb-2">{{ title }}</h1>
    <p class="text-sm sm:text-lg opacity-70">{{ subtitle }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>
