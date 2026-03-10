<template>
  <p class="absolute top-0 text-xs left-1/2 -translate-x-1/2 lg:text-lg">
    C2 - CRT v2.1.0 <span><button class="cursor-pointer" @click="setLanguage('en')" :aria-label="'Switch to English'">EN</button>/<button class="cursor-pointer" @click="setLanguage('es')" :aria-label="'Switch to Spanish'">ES</button></span>
  </p>

  <p class="absolute bottom-0 text-xs lg:text-lg left-1/2 -translate-x-1/2 w-full text-center">
    Connection from: {{ ip || 'detecting...' }}
    <span class="hidden sm:inline"> - Secure connection established </span>
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const ip = ref('')

onMounted(() => {
  getIP()
})

async function getIP(): Promise<void> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data: { ip: string } = await response.json()
    ip.value = data.ip
  } catch (error) {
    console.error('Error fetching IP address:', error)
    ip.value = 'unknown'
  }
}

function setLanguage(lang: 'en' | 'es'): void {
  // TODO: Implement i18n language switching
  console.log(`Language switched to: ${lang}`)
}
</script>

<style scoped></style>
