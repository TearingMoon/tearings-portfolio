<template>
  <main
    class="w-screen h-screen flex items-center justify-center font-bold text-green-500 text-4xl"
  >
    <div ref="lateralLoadingInfo" class="absolute top-0 left-0 flex flex-col text-xs gap-0">
      <span v-for="(text, index) in displayedText" :key="index" class="m-0 text-green-700">{{ text }}</span>
    </div>

    <h1>Starting{{ startingDots }}</h1>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const startingDots = ref('')
const lateralLoadingInfo = useTemplateRef('lateralLoadingInfo')
const displayedText = ref<string[]>([])

onMounted(() => {
  setInterval(() => {
    startingDots.value += '.'
    if (startingDots.value.length > 3) {
      startingDots.value = ''
    }
  }, 500)

  const maxMessages = 20
  let messageAmmount = 0

  setInterval(() => {
    if (displayedText.value) {
      displayedText.value = displayedText.value.concat(GetRandomLoadingMessage())
      messageAmmount++

      if (messageAmmount > maxMessages) {
        displayedText.value = []
        messageAmmount = 0
      }
    }
  }, 100)
})

function GetRandomLoadingMessage() {
  const messages = [
    'Loading shaders...',
    'Initializing data...',
    'Analyzing IPs...',
    'Almost there...',
    'Fetching resources...',
    'Compiling assets...',
    'Connecting to server...',
    'Loading textures...',
    'Setting up environment...',
    'Optimizing performance...',
    'Synchronizing data...',
    'Preparing user interface...',
    'Loading modules...',
    'Starting services...',
    'Configuring settings...',
    'Loading scripts...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading assets...',
    'Building cache...',
    'Verifying integrity...',
    'Starting application...',
    'Loading user data...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...',
    'Updating database...',
    'Loading libraries...',
    'Initializing framework...',
    'Setting up modules...',
    'Loading configurations...',
    'Starting engines...',
    'Loading fonts...',
    'Preparing resources...',
    'Loading animations...',
    'Initializing graphics...',
    'Loading audio...',
    'Setting up network...',
    'Loading user preferences...',
    'Initializing system...',
    'Loading dependencies...',
    'Preparing data...',
    'Loading components...',
    'Starting processes...',
    'Loading utilities...',
    'Initializing application...',
    'Loading framework...',
    'Setting up environment...',
    'Loading configurations...',
    'Starting services...',
    'Loading assets...',
    'Preparing user interface...',
    'Loading modules...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading scripts...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...',
    'Updating database...',
    'Loading libraries...',
    'Initializing framework...',
    'Setting up modules...',
    'Loading configurations...',
    'Starting engines...',
    'Loading fonts...',
    'Preparing resources...',
    'Loading animations...',
    'Initializing graphics...',
    'Loading audio...',
    'Setting up network...',
    'Loading user preferences...',
    'Initializing system...',
    'Loading dependencies...',
    'Preparing data...',
    'Loading components...',
    'Starting processes...',
    'Loading utilities...',
    'Initializing application...',
    'Loading framework...',
    'Setting up environment...',
    'Loading configurations...',
    'Starting services...',
    'Loading assets...',
    'Preparing user interface...',
    'Loading modules...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading scripts...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...',
    'Updating database...',
    'Loading libraries...',
    'Initializing framework...',
    'Setting up modules...',
    'Loading configurations...',
    'Starting engines...',
    'Loading fonts...',
    'Preparing resources...',
    'Loading animations...',
    'Initializing graphics...',
    'Loading audio...',
    'Setting up network...',
    'Loading user preferences...',
    'Initializing system...',
    'Loading dependencies...',
    'Preparing data...',
    'Loading components...',
    'Starting processes...',
    'Loading utilities...',
    'Initializing application...',
    'Loading framework...',
    'Setting up environment...',
    'Loading configurations...',
    'Starting services...',
    'Loading assets...',
    'Preparing user interface...',
    'Loading modules...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading scripts...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...',
    'Updating database...',
    'Loading libraries...',
    'Initializing framework...',
    'Setting up modules...',
    'Loading configurations...',
    'Starting engines...',
    'Loading fonts...',
    'Preparing resources...',
    'Loading animations...',
    'Initializing graphics...',
    'Loading audio...',
    'Setting up network...',
    'Loading user preferences...',
    'Initializing system...',
    'Loading dependencies...',
    'Preparing data...',
    'Loading components...',
    'Starting processes...',
    'Loading utilities...',
    'Initializing application...',
    'Loading framework...',
    'Setting up environment...',
    'Loading configurations...',
    'Starting services...',
    'Loading assets...',
    'Preparing user interface...',
    'Loading modules...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading scripts...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...',
    'Updating database...',
    'Loading libraries...',
    'Initializing framework...',
    'Setting up modules...',
    'Loading configurations...',
    'Starting engines...',
    'Loading fonts...',
    'Preparing resources...',
    'Loading animations...',
    'Initializing graphics...',
    'Loading audio...',
    'Setting up network...',
    'Loading user preferences...',
    'Initializing system...',
    'Loading dependencies...',
    'Preparing data...',
    'Loading components...',
    'Starting processes...',
    'Loading utilities...',
    'Initializing application...',
    'Loading framework...',
    'Setting up environment...',
    'Loading configurations...',
    'Starting services...',
    'Loading assets...',
    'Preparing user interface...',
    'Loading modules...',
    'Initializing components...',
    'Checking dependencies...',
    'Finalizing setup...',
    'Loading scripts...',
    'Applying configurations...',
    'Establishing connection...',
    'Loading plugins...',
    'Preparing workspace...'
  ]

  return messages[Math.floor(Math.random() * messages.length)]
}
</script>

<style scoped></style>
