<template>
  <span
    :class="[
      'text-xs px-2 py-0.5 border transition-colors',
      variant === 'solid' ? 'bg-green-500/20 border-green-500/50' : 'border-green-500/50',
      hoverable ? 'hover:border-green-500 hover:bg-green-500/20' : ''
    ]"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  variant?: 'outline' | 'solid'
  hoverable?: boolean
}>()
</script>
