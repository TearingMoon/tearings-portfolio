<template>
  <button
    @click="emit('click')"
    class="w-full h-full border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])
</script>
