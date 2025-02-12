<template>
  <SectionComponent class="w-full">
    <h1 class="font-bold text-3xl text-white mb-5">{{ title }}</h1>
    <div class="bg-neutral-800 p-10 shadow rounded-2xl">
      <slot class="flex flex-col items-center"> </slot>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '@/components/utils/SectionComponent.vue'

defineProps({
  title: {
    type: String,
    required: true,
    default: 'Section Title'
  }
})
</script>

<style scoped></style>
