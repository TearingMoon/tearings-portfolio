<template>
  <main class="flex flex-col items-center justify-center h-screen w-screen gap-2 md:gap-4">
    <h1 class="w-2/3 text-2xl sm:p-5 md:text-7xl text-center bg-green-500 text-neutral-900 font-bold">
      David Torrubia
    </h1>
    <h2 class="text-xs md:text-5xl text-green-500 text-center"> David Torrubia Software & Engineering solutions</h2>
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
