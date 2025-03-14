<template>
  <main class="flex flex-col md:flex-row items-center justify-center h-screen w-screen">
    <p class="absolute bottom-0 text-green-700 text-xs md:text-lg">
      Connection from: {{ ip }} - Secure connection established
    </p>
    <p class="absolute top-0 text-green-700 text-xs md:text-lg">C2 - CRT v1.2.3</p>
    <div
      class="items-center md:gap-y-10 w-full md:w-1/4 md:h-full md:pr-0 px-10 pt-10 md:py-10 justify-center md:justify-normal grid grid-cols-2 md:grid-cols-1 gap-4"
    >
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-2s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Uplink')"
      >
        Uplink
        <span class="font-medium text-xs sm:text-lg">(Contacto)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-1s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Operations')"
      >
        Operations
        <span class="font-medium text-xs sm:text-lg">(Proyectos)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Systems')"
      >
        Systems
        <span class="font-medium text-xs sm:text-lg">(Habilidades)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-1s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Intel')"
      >
        Intel
        <span class="font-medium text-xs sm:text-lg">(Cosas interesantes)</span>
      </button>
    </div>
    <!-- Map -->
    <div class="w-full md:w-2/4 p-10 h-full flex items-center justify-center">
      <div
        ref="map"
        class="border-2 h-full w-full border-green-500 transition-all duration-500 overflow-hidden"
        :class="[isDisplayClosed ? 'max-h-0' : 'max-h-full']"
      >
        <MapComponent ref="MapComponentRef" />
      </div>
    </div>
    <!-- Buttons -->
    <div
      class="items-center md:gap-y-10 w-full md:w-1/4 md:h-full md:pl-0 px-10 pb-10 md:py-10 justify-center md:justify-normal grid grid-cols-2 md:grid-cols-1 gap-4"
    >
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-2s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Uplink')"
      >
        Uplink
        <span class="font-medium text-xs sm:text-lg">(Contacto)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-1s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Operations')"
      >
        Operations
        <span class="font-medium text-xs sm:text-lg">(Proyectos)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Systems')"
      >
        Systems
        <span class="font-medium text-xs sm:text-lg">(Habilidades)</span>
      </button>
      <button
        class="text-green-500 md:text-4xl border-2 p-2 border-green-500 hover:bg-green-500 hover:text-black font-bold hover:cursor-pointer w-full h-full animate__animated animate__fadeIn animate__delay-2s flex flex-col items-center justify-center"
        @click="MapComponentRef?.goToPoint('Alerts')"
      >
        Alerts
        <span class="font-medium text-xs sm:text-lg">(Novedades)</span>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import MapComponent from './MapComponent.vue'
import { onMounted } from 'vue'
import { ref, useTemplateRef } from 'vue'

const ip = ref('')

const isDisplayClosed = ref(true)
const MapComponentRef = useTemplateRef('MapComponentRef')

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
