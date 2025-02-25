<template>
  <div
    class="w-full border-2 border-neutral-800 flex flex-col rounded-2xl box-content shadow-md h-full shadow-black overflow-hidden bg-black"
    @click="ConsoleClicked"
  >
    <!-- Hidden input -->
    <input
      type="text"
      class="absolute -top-10 left-0 w-0 h-0 opacity-0"
      v-model="hiddenInputText"
      @keydown="handleKeydown"
      ref="hiddenInput"
      autofocus
    />
    <!-- Header Container -->
    <div class="w-full h-10 bg-neutral-700 shadow flex flex-row items-center px-5">
      <h1 class="text-neutral-400 md:text-lg">/usr/local/bin/{{ currentProgram }}</h1>
      <!-- Remove this button -->
      <svg width="40" height="10" xmlns="http://www.w3.org/2000/svg" class="ml-auto">
        <circle cx="5" cy="5" r="5" fill="yellow" />
        <circle cx="20" cy="5" r="5" fill="green" />
        <circle cx="35" cy="5" r="5" fill="red" />
      </svg>
    </div>
    <!-- Console Container -->
    <div class="h-full p-5 overflow-y-auto flex flex-col customScrolbar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const currentProgram = ref('AboutMe')

const hiddenInputText = ref('')

onMounted(() => {})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    executeCommand()
  }
}

function executeCommand() {
  console.log('Command executed')
  console.log(hiddenInputText.value)
}

function ConsoleClicked() {
  console.log('Console clicked')
  const hiddenInput = document.getElementById('hiddenInput')
  hiddenInput?.focus()
}
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
