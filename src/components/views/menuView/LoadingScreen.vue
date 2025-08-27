<template>
  <main
    class="w-screen h-screen flex flex-col items-center justify-center font-bold text-4xl gap-4"
  >
    <div
      ref="lateralLoadingInfo"
      class="absolute top-0 left-0 flex text-sm flex-col gap-0 opacity-50"
    >
      <span v-for="(text, index) in displayedText" :key="index" class="m-0">{{ text }}</span>
    </div>

    <h1>Starting{{ dots }}</h1>
    <LoadingBarComponent :currentProgress="loadingBarProgress" class="w-2/3" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoadingBarComponent from '@/components/common/LoadingBarComponent.vue'

const dots = ref('')
const displayedText = ref<string[]>([])
const loadingBarProgress = ref(0)

const emit = defineEmits({
  'finished-loading': () => true
})

const props = defineProps({
  maxMessages: {
    type: Number,
    default: 10
  }
})

onMounted(() => {
  //Add dots to the loading message
  const dotsInterval = setInterval(() => {
    dots.value += '.'
    if (dots.value.length > 3) {
      dots.value = ''
    }
  }, 250)

  ///Add random loading messages
  let messageAmmount = 0
  const loadingMessageInterval = setInterval(() => {
    if (displayedText.value) {
      displayedText.value = displayedText.value.concat(GetRandomLoadingMessage())
      messageAmmount++

      if (messageAmmount > props.maxMessages) {
        displayedText.value = []
        messageAmmount = 0
      }
    }
  }, 50)

  //Add progress to the loading bar
  const loadingBarInterval = setInterval(() => {
    //Add random progress to the loading bar
    if (loadingBarProgress.value < 100) {
      loadingBarProgress.value += Math.floor(Math.random() * 10)
    }

    if (loadingBarProgress.value >= 100) {
      setTimeout(() => {
        emit('finished-loading')
      }, 1000)
      clearInterval(loadingBarInterval)
      clearInterval(loadingMessageInterval)
      clearInterval(dotsInterval)
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
