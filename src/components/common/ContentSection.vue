<template>
  <section :class="['border p-4', borderDashed ? 'border-dashed border-green-500/50' : 'border-green-500']">
    <SectionTitle v-if="title" :title="title" />
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'

defineProps<{
  title?: string
  borderDashed?: boolean
}>()
</script>
