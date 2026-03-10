<template>
  <div class="border border-green-500 p-4 text-center">
    <div class="text-2xl sm:text-4xl font-bold text-green-400">{{ value }}</div>
    <div class="text-xs sm:text-sm opacity-70">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
  label: string
}>()
</script>
