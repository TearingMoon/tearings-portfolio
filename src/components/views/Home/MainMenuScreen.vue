<template>
  <main class="flex flex-row items-center justify-center h-screen w-screen">
    <p class="absolute bottom-0 text-green-700">Connection from: {{ ip }}</p>

    <!-- Map -->
    <div class="w-3/4 p-10 h-full flex items-center justify-center">
      <div
        ref="map"
        class="border-2 h-full w-full border-green-500 bg-[url(https://thumbs.dreamstime.com/b/correspondencia-topogr%C3%A1fica-abstracta-16531890.jpg)] bg-cover bg-center transition-all duration-500"
        :class="[isDisplayClosed ? 'max-h-0' : 'max-h-full']"
      ></div>
    </div>
    <!-- Buttons -->
    <div class="flex flex-col items-center justify-center gap-4 w-1/4 h-full">
      <button
        class="text-green-500 text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 w-2/3 font-bold hover:cursor-pointer"
      >
        Uplink
      </button>
      <button
        class="text-green-500 text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 w-2/3 font-bold hover:cursor-pointer"
      >
        Operations
      </button>
      <button
        class="text-green-500 text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 w-2/3 font-bold hover:cursor-pointer"
      >
        Systems
      </button>
      <button
        class="text-green-500 text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 w-2/3 font-bold hover:cursor-pointer"
      >
        Intel
      </button>
      <button
        class="text-green-500 text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-neutral-900 w-2/3 font-bold hover:cursor-pointer"
      >
        Alerts
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
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
