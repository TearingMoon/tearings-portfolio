<template>
  <main class="flex flex-col w-full h-full">
    <div class="text-white">Hola</div>
    <SequentialTextComponent class="font-bold" :typeSpeed="10" ref="seqText" @finished="onTextDone">
      <pre v-pre>
888     888 8888888b.  888      8888888 888b    888 888    d8P  
    888     888 888   Y88b 888        888   8888b   888 888   d8P   
    888     888 888    888 888        888   88888b  888 888  d8P    
    888     888 888   d88P 888        888   888Y88b 888 888d88K     
    888     888 8888888P"  888        888   888 Y88b888 8888888b    
    888     888 888        888        888   888  Y88888 888  Y88b   
    Y88b. .d88P 888        888        888   888   Y8888 888   Y88b  
    "Y88888P"  888        88888888 8888888 888    Y888 888    Y88b</pre
      >
    </SequentialTextComponent>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SequentialTextComponent from '@/components/common/SequentialTextComponent.vue'

const seqText = ref()

onMounted(() => {
  seqText.value?.start()
})

function onTextDone() {
  console.log('Texto terminado')
}
</script>
