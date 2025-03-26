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
}

/* Firefox */
progress::-moz-progress-value {
  background: var(--color-green-500);
}
progress::-moz-progress-bar {
  background: transparent;
}

/* Chrome */
progress::-webkit-progress-value {
  background: var(--color-green-500);
}
progress::-webkit-progress-bar {
  background: transparent;
}
</style>
