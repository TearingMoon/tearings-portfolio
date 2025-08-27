<template>
  <main class="flex flex-col w-full h-full">
    <div class="text-white">Hola</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const seqText = ref()

onMounted(() => {
  seqText.value?.start()
})

function onTextDone() {
  console.log('Texto terminado')
}
</script>
