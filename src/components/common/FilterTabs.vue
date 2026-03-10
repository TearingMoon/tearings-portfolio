<template>
  <div class="flex flex-wrap gap-2" :class="centered ? 'justify-center' : ''">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="$emit('update:modelValue', tab)"
      :class="[
        'px-4 py-2 border border-green-500 transition-all duration-300 cursor-pointer',
        small ? 'text-sm' : '',
        modelValue === tab
          ? 'bg-green-500 text-black font-bold'
          : 'hover:bg-green-500/20'
      ]"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: string[]
  modelValue: string
  centered?: boolean
  small?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
