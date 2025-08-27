<template>
  <ButtonComponent
    class="flex flex-col items-center justify-center w-full h-full"
    text-class="font-bold text-xs sm:text-2xl"
    :text="props.text"
    label-class="text-xs sm:text-lg"
    :label="props.label"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue'
const emit = defineEmits(['click'])
const props = defineProps<{
  text?: string
  label?: string
}>()
</script>
