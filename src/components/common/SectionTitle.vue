<template>
  <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
    <span class="text-green-400">[</span> {{ title }} <span class="text-green-400">]</span>
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
