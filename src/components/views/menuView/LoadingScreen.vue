<template>
  <main
    class="w-screen h-screen flex flex-col items-center justify-center font-bold gap-2 md:gap-4"
    role="progressbar"
    :aria-valuenow="loadingBarProgress"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Loading portfolio"
  >
    <div
      ref="lateralLoadingInfo"
      class="absolute top-0 left-0 flex text-xs sm:text-sm flex-col gap-0 opacity-50"
      aria-hidden="true"
    >
      <span v-for="(text, index) in displayedText" :key="index" class="m-0">{{ text }}</span>
    </div>

    <div class="text-2xl">Starting{{ dots }}</div>
    <LoadingBarComponent :currentProgress="loadingBarProgress" class="w-2/3 sm:text-4xl" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import LoadingBarComponent from '@/components/common/LoadingBarComponent.vue'

const dots = ref('')
const displayedText = ref<string[]>([])
const loadingBarProgress = ref(0)

let dotsInterval: ReturnType<typeof setInterval> | null = null
let loadingMessageInterval: ReturnType<typeof setInterval> | null = null
let loadingBarInterval: ReturnType<typeof setInterval> | null = null

const emit = defineEmits<{
  (e: 'finished-loading'): void
}>()

const props = withDefaults(defineProps<{
  maxMessages?: number
}>(), {
  maxMessages: 10
})

const loadingMessages = [
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
  'Starting engines...',
  'Loading fonts...',
  'Preparing resources...',
  'Loading animations...',
  'Initializing graphics...',
  'Loading audio...',
  'Setting up network...'
]

onMounted(() => {
  // Add dots to the loading message
  dotsInterval = setInterval(() => {
    dots.value = dots.value.length >= 3 ? '' : dots.value + '.'
  }, 250)

  // Add random loading messages
  let messageAmount = 0
  loadingMessageInterval = setInterval(() => {
    displayedText.value.push(GetRandomLoadingMessage())
    messageAmount++

    if (messageAmount > props.maxMessages) {
      displayedText.value = []
      messageAmount = 0
    }
  }, 50)

  // Add progress to the loading bar
  loadingBarInterval = setInterval(() => {
    if (loadingBarProgress.value < 100) {
      loadingBarProgress.value += Math.floor(Math.random() * 10)
    }

    if (loadingBarProgress.value >= 100) {
      setTimeout(() => {
        emit('finished-loading')
      }, 1000)
      clearAllIntervals()
    }
  }, 100)
})

onUnmounted(() => {
  clearAllIntervals()
})

function clearAllIntervals() {
  if (dotsInterval) clearInterval(dotsInterval)
  if (loadingMessageInterval) clearInterval(loadingMessageInterval)
  if (loadingBarInterval) clearInterval(loadingBarInterval)
}

function GetRandomLoadingMessage(): string {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
}
</script>

<style scoped></style>
