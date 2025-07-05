<template>
  <ButtonComponent
    class="flex flex-col items-center justify-center w-full h-full"
    text-class="font-bold"
    :text="props.text"
    label-class="text-crt-sm "
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
