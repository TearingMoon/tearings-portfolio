<template>
  <p class="absolute top-0 text-xs left-1/2 -translate-x-1/2 lg:text-lg">
    C2 - CRT v2.1.0 <span><button class="cursor-pointer">EN</button>/<button class="cursor-pointer">ES</button></span>
  </p>

  <p class="absolute bottom-0 text-xs lg:text-lg left-1/2 -translate-x-1/2 w-full text-center">
    Connection from: {{ ip }}
    <span class="hidden sm:inline"> - Secure connection established </span>
  </p>
</template>

<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

const ip = ref('')

onMounted(() => {
  getIP()
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
