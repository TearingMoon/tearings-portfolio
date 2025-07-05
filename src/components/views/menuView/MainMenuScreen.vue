<template>
  <main
    class="flex flex-col lg:flex-row items-center justify-center h-screen w-screen overflow-hidden p-5 lg:p-10 gap-5 lg:gap-10"
  >
    <p class="absolute bottom-0 text-xs lg:text-lg">
      Connection from: {{ ip }} - Secure connection established
    </p>
    <p class="absolute top-0 text-xs lg:text-lg">C2 - CRT v1.2.3</p>

    <!-- Buttons -->
    <MenuButtonList>
      <MenuButton
        text="COMM-LINK 01"
        label="(Contact)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />
      <MenuButton
        text="OPS-CATALOG 02"
        label="(Projects)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />
      <MenuButton
        text="SERVICE RECORD 03"
        label="(Achievements)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />
      <MenuButton
        text="DOSSIER 04"
        label="(About + Skills)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />
    </MenuButtonList>
    <!-- Map -->
    <div class="w-full lg:w-2/4 h-full flex items-center justify-center">
      <div
        ref="map"
        class="border-2 h-full w-full border-green-500 transition-all duration-500 overflow-hidden crt-shadow"
        :class="[isDisplayClosed ? 'max-h-0' : 'max-h-full']"
      >
        <MapComponent ref="MapComponentRef" />
      </div>
    </div>
    <!-- Buttons -->
    <MenuButtonList>
      <MenuButton
        text="BLACK-OPS LAB 05"
        label="(Experiments / WIP)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />

      <MenuButton
        text="COMMAND UPLINK 06"
        label="(News + Devlogs)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />

      <MenuButton
        text="ARCHIVE ACCESS 07"
        label="(Documents)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />

      <MenuButton
        text="OP-STATUS 08"
        label="(Availability)"
        @click="MapComponentRef?.goToPoint('Uplink')"
      />
    </MenuButtonList>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, useTemplateRef } from 'vue'
import MapComponent from '@/components/views/menuView/MapComponent.vue'
import MenuButton from './MenuButton.vue'
import MenuButtonList from './MenuButtonList.vue'

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
