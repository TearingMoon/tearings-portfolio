<template>
  <div
    class="w-full border-2 border-neutral-800 flex flex-col rounded-2xl box-content shadow-md h-full shadow-black overflow-hidden bg-black"
  >
    <!-- Header Container -->
    <div class="w-full h-10 bg-neutral-700 shadow flex flex-row items-center px-5">
      <h1 class="text-neutral-400 md:text-lg">/usr/local/bin/{{ currentProgram }}</h1>
      <!-- Remove this button -->
      <button @click="clearConsole" class="ml-auto">Clear Console</button>
      <svg width="40" height="10" xmlns="http://www.w3.org/2000/svg" class="ml-auto">
        <circle cx="5" cy="5" r="5" fill="yellow" />
        <circle cx="20" cy="5" r="5" fill="green" />
        <circle cx="35" cy="5" r="5" fill="red" />
      </svg>
    </div>
    <!-- Console Container -->
    <div
      class="h-full p-5 overflow-y-auto flex flex-col customScrolbar"
      ref="consoleContainer"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
const currentProgram = ref('AboutMe')

const consoleDisplayedData = ref([])
const consoleContainer = useTemplateRef('consoleContainer')

function clearConsole() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML = ''
  }
}

function promptInteraction() {}

function showError(error: string) {}

function appendToConsole(data: string) {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += data
    consoleContainer.value.scrollTop = consoleContainer.value.scrollHeight
  }
}

onMounted(() => {
  promptInteraction()
  for (let i = 0; i < 30; i++) {
    appendToConsole(`<div>Line ${i}<div>`)
  }
})
</script>

<style scoped>
/* width */
.customScrolbar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.customScrolbar::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
.customScrolbar::-webkit-scrollbar-thumb {
  background: var(--color-neutral-800);
}

/* Handle on hover */
.customScrolbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-700);
}
</style>
