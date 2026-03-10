<template>
  <div class="mb-4">
    <div v-if="showLabel" class="flex justify-between text-xs mb-1">
      <span>{{ label }}</span>
      <span>{{ value }}%</span>
    </div>
    <div class="h-2 border border-green-500 bg-black">
      <div
        class="h-full bg-green-500 transition-all duration-500"
        :style="{ width: `${value}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
  label?: string
  showLabel?: boolean
}>()
</script>
