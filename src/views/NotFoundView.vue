<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col items-center justify-center gap-5">
        <div class="text-center">
          <h1 class="text-6xl sm:text-9xl font-bold mb-4 glitch-text">404</h1>
          <div class="text-xl sm:text-3xl mb-2">ERROR: PAGE NOT FOUND</div>
          <p class="text-sm sm:text-lg opacity-70 mb-8">
            The requested resource could not be located on this server.
          </p>
        </div>
        
        <div class="terminal-box border-2 border-green-500 p-4 w-full max-w-md text-left">
          <p class="text-green-400">guest@localhost:~$ <span class="text-white">locate {{ currentPath }}</span></p>
          <p class="text-red-400 mt-2">[ERROR] Path not found in filesystem</p>
          <p class="text-yellow-400 mt-1">[WARN] Redirecting to safe zone...</p>
        </div>

        <ButtonComponent
          text="[ RETURN TO BASE ]"
          class="mt-6"
          @click="goHome"
        />
        
        <p class="text-xs opacity-50 mt-4">
          Auto-redirect in {{ countdown }} seconds...
        </p>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SectionComponent from '@/components/common/SectionComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()
const route = useRoute()
const countdown = ref(10)
let countdownInterval: ReturnType<typeof setInterval> | null = null

const currentPath = computed(() => route.fullPath)

const goHome = () => {
  router.push({ name: 'menu', params: { fast: '1' } })
}

onMounted(() => {
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      goHome()
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.glitch-text {
  animation: glitch 1s infinite;
}

@keyframes glitch {
  0%, 90%, 100% {
    text-shadow: 
      2px 0 lime,
      -2px 0 red;
  }
  92% {
    text-shadow: 
      -2px 0 lime,
      2px 0 red;
  }
  94% {
    text-shadow: 
      2px 2px lime,
      -2px -2px red;
  }
  96% {
    text-shadow: 
      -2px 2px lime,
      2px -2px red;
  }
}

.terminal-box {
  font-family: 'Share Tech Mono', monospace;
  background: rgba(0, 0, 0, 0.5);
}
</style>
