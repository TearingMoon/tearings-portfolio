<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="flex items-center gap-3 p-3 border border-green-500/50 transition-colors"
    :class="href ? 'hover:border-green-500 hover:bg-green-500/10 group' : ''"
  >
    <span class="text-lg font-mono text-green-500">[{{ tag }}]</span>
    <div>
      <div class="font-bold transition-colors" :class="href ? 'group-hover:text-green-400' : ''">
        {{ title }}
      </div>
      <div class="text-sm opacity-70">{{ subtitle }}</div>
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  tag: string
  title: string
  subtitle: string
  href?: string
}>()
</script>
