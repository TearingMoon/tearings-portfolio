<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center">
    <AppProgressBar :progress="props.progress" class="w-56" />
    <span class="text-white/50 font-terminal text-center w-56">Generating starfield</span>
  </div>
</template>

<script setup lang="ts">
import AppProgressBar from "@/components/ui/AppProgressBar.vue";

const props = withDefaults(
  defineProps<{
    progress: number;
  }>(),
  {
    progress: 0,
  },
);
</script>

<style scoped></style>
