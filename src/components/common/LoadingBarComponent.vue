<template>
  <progress
    max="100"
    :value="currentProgress"
    class="border-2 border-green-500 progress"
  ></progress>
</template>

<script setup lang="ts">
defineProps<{
  currentProgress: number
}>()
</script>

<style scoped>
progress {
  color: var(--color-green-500);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none !important;
  background-color: transparent;
}

/* Firefox */
progress::-moz-progress-bar {
  background-color: var(--color-green-500);
}

/* Chrome */
progress::-webkit-progress-value {
  background: var(--color-green-500);
  background-image: none;
}
progress::-webkit-progress-bar {
  background: transparent !important;
}
</style>
