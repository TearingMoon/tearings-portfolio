<template>
  <button
    @click="emit('click')"
    :class="[
      'inline-flex items-center border-2 px-4 py-2 border-green-500  transition-colors duration-200 cursor-pointer',
      'hover:bg-green-500 hover:text-black',
      props.class
    ]"
    role="button"
    :aria-label="props.label || props.text || 'button'"
  >
    <span :class="textClass">{{ props.text }}</span>
    <span v-if="props.label" :class="labelClass"> {{ props.label }}</span>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

const props = defineProps<{
  class?: string
  text?: string
  textClass?: string
  label?: string
  labelClass?: string
}>()
</script>
