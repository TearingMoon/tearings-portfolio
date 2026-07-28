<template>
  <progress class="custom-progressbar" :value="props.progress"></progress>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    progress: number;
  }>(),
  {
    progress: 0,
  },
);
</script>

<style scoped>
.custom-progressbar::-webkit-progress-bar {
  background-color: transparent;
  border: 2px solid white;
}

.custom-progressbar::-webkit-progress-value {
  background-color: white;
}

.custom-progressbar::-moz-progress-bar {
  background-color: transparent;
}
</style>
