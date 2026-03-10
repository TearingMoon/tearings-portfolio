<template>
  <main
    class="flex flex-col lg:flex-row items-center justify-center h-screen w-screen overflow-hidden p-5 lg:p-10 gap-5 lg:gap-10"
  >
    <!-- Terminal Header -->
    <div class="absolute top-5 left-5 text-xs opacity-50 hidden lg:block font-mono">
      <p>SYSTEM: PORTFOLIO v2.1.0</p>
      <p>STATUS: {{ systemStatus }}</p>
      <p>UPTIME: {{ uptime }}</p>
    </div>

    <!-- Left Buttons -->
    <MenuButtonList>
      <MenuButton
        text="COMM-LINK 01"
        label="(Contact)"
        @click="MapComponentRef?.goToPoint('COMM-LINK 01')"
        @mouseenter="setHoverInfo('Establish communication channel')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="OPS-CATALOG 02"
        label="(Projects)"
        @click="MapComponentRef?.goToPoint('OPS-CATALOG 02')"
        @mouseenter="setHoverInfo('Browse completed operations')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="SERVICE RECORD 03"
        label="(Achievements)"
        @click="MapComponentRef?.goToPoint('SERVICE RECORD 03')"
        @mouseenter="setHoverInfo('View documented milestones')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="DOSSIER 04"
        label="(About)"
        @click="MapComponentRef?.goToPoint('DOSSIER 04')"
        @mouseenter="setHoverInfo('Access personnel file')"
        @mouseleave="clearHoverInfo"
      />
    </MenuButtonList>

    <!-- Map Container -->
    <div class="w-full lg:w-2/4 flex-1 lg:flex-none min-h-0 lg:h-full flex flex-col items-center justify-center gap-2">
      <!-- Hover Info Display -->
      <div 
        class="text-xs text-center h-6 opacity-70 transition-opacity duration-300 hidden lg:block"
        :class="hoverInfo ? 'opacity-100' : 'opacity-0'"
      >
        {{ hoverInfo || '...' }}
      </div>
      
      <div
        ref="map"
        class="border-2 flex-1 lg:h-full min-h-0 w-full border-green-500 transition-all duration-500 overflow-hidden crt-shadow relative"
        :class="[isDisplayClosed ? 'max-h-0' : 'max-h-full']"
      >
        <MapComponent ref="MapComponentRef" />
        
        <!-- Scanline overlay -->
        <div class="absolute inset-0 pointer-events-none scanlines opacity-20"></div>
      </div>
      
      <!-- Map Label -->
      <div class="text-xs opacity-50 text-center hidden lg:block">
        [ GLOBAL OPERATIONS MAP - CLICK TO NAVIGATE ]
      </div>
    </div>

    <!-- Right Buttons -->
    <MenuButtonList>
      <MenuButton
        text="BLACK-OPS LAB 05"
        label="(Experiments / WIP)"
        @click="MapComponentRef?.goToPoint('BLACK-OPS LAB 05')"
        @mouseenter="setHoverInfo('Access experimental projects')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="COMMAND UPLINK 06"
        label="(News + Devlogs)"
        @click="MapComponentRef?.goToPoint('COMMAND UPLINK 06')"
        @mouseenter="setHoverInfo('Receive latest transmissions')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="ARCHIVE ACCESS 07"
        label="(Documents)"
        @click="MapComponentRef?.goToPoint('ARCHIVE ACCESS 07')"
        @mouseenter="setHoverInfo('Download official documents')"
        @mouseleave="clearHoverInfo"
      />
      <MenuButton
        text="OP-STATUS 08"
        label="(Availability)"
        @click="MapComponentRef?.goToPoint('OP-STATUS 08')"
        @mouseenter="setHoverInfo('Check operational status')"
        @mouseleave="clearHoverInfo"
      />
    </MenuButtonList>

    <!-- Terminal Footer -->
    <div class="absolute bottom-5 right-5 text-xs opacity-50 hidden lg:block font-mono text-right">
      <p>NODES: 8 ACTIVE</p>
      <p>ENCRYPTION: AES-256</p>
      <p>{{ currentTime }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import MapComponent from '@/components/views/menuView/MapComponent.vue'
import MenuButton from './MenuButton.vue'
import MenuButtonList from './MenuButtonList.vue'

const isDisplayClosed = ref(true)
const MapComponentRef = useTemplateRef('MapComponentRef')
const hoverInfo = ref('')
const systemStatus = ref('OPERATIONAL')
const uptime = ref('00:00:00')
const currentTime = ref('')

let uptimeInterval: ReturnType<typeof setInterval> | null = null
let uptimeSeconds = 0

function setHoverInfo(info: string) {
  hoverInfo.value = `> ${info}`
}

function clearHoverInfo() {
  hoverInfo.value = ''
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour12: false })
}

onMounted(() => {
  setTimeout(() => {
    isDisplayClosed.value = false
  }, 1000)

  uptimeInterval = setInterval(() => {
    uptimeSeconds++
    uptime.value = formatUptime(uptimeSeconds)
    updateTime()
  }, 1000)
  
  updateTime()
})

onUnmounted(() => {
  if (uptimeInterval) {
    clearInterval(uptimeInterval)
  }
})
</script>

<style scoped>
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 0, 0.03) 2px,
    rgba(0, 255, 0, 0.03) 4px
  );
}
</style>
