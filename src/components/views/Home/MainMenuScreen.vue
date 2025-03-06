<template>
  <main class="flex flex-col md:flex-row items-center justify-center h-screen w-screen">
    <p class="absolute bottom-0 text-green-700 text-xs md:text-lg">
      Connection from: {{ ip }} - Secure connection established
    </p>

    <!-- Map -->
    <div class="w-full md:w-3/4 p-10 h-full flex items-center justify-center">
      <div
        ref="map"
        class="border-2 h-full w-full border-green-500 transition-all duration-500"
        :class="[isDisplayClosed ? 'max-h-0' : 'max-h-full']"
      >
        <MapComponent />
      </div>
    </div>
    <!-- Buttons -->
    <div
      class="items-center md:gap-y-10 w-full md:w-1/4 md:h-full md:pl-0 px-10 pb-10 md:py-10 justify-center md:justify-normal grid grid-cols-2 md:grid-cols-1 gap-4"
    >
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-2s"
      >
        Uplink
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-1s"
      >
        Operations
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn"
      >
        Systems
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-1s"
      >
        Intel
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-2s"
      >
        Alerts
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import MapComponent from './MapComponent.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const ip = ref('')

const isDisplayClosed = ref(true)

onMounted(() => {
  getIP()

  setTimeout(() => {
    isDisplayClosed.value = false
  }, 1000)
})

async function getIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    ip.value = data.ip
  } catch (error) {
    console.error('Error fetching IP address:', error)
  }
}
</script>

<style scoped></style>
