<template>
  <main class="flex flex-col items-center justify-center h-screen w-screen sm:gap-4">
    <h1 class="text-3xl sm:text-7xl text-green-500 font-bold">David Torrubia</h1>
    <div class="bg-green-500 h-1 sm:h-2 w-2/3"></div>
    <h2 class="sm:text-5xl text-green-500">Software & Engineering solutions</h2>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits({
  'finished-splash': () => true
})

const props = defineProps({
  spashDuration: {
    type: Number,
    default: 2
  }
})

onMounted(() => {
  setTimeout(() => {
    emit('finished-splash')
  }, props.spashDuration * 1000)
})
</script>

<style scoped></style>
