<template>
  <div class="text-center py-10 opacity-70">
    <p class="text-2xl mb-2">[{{ title }}]</p>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  message: string
}>(), {
  title: 'NO DATA FOUND'
})
</script>
