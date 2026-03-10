<template>
  <ul :class="['space-y-1', small ? 'text-sm' : '']">
    <li v-for="item in items" :key="item" class="flex items-center gap-2">
      <span class="text-green-500">►</span> {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  items: string[]
  small?: boolean
}>()
</script>
