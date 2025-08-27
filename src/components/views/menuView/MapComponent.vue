<template>
  <div class="w-full h-full relative">
    <svg class="w-full h-full text-green-500" ref="mainSvg"></svg>
    <div class="flex items-center justify-center w-full h-full"></div>
    <!-- <div class="absolute bottom-0">fps: {{ mapRenderer?.calculated_fps }}</div> -->
    <div class="absolute pointer-events-none bottom-1 left-1 text-green-500 opacity-50 text-xs">
      <div v-for="(message, i) in messageList" :key="message + '-' + i">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MapRenderer from '@/typescript/map/MapRenderer'

const mainSvg = ref<SVGSVGElement | null>(null)

const messageList = ref<string[]>([])

let mapRenderer: MapRenderer | null = null

const dataPoints: { name: string; longitude: number; latitude: number; url: string }[] = [
  {
    name: 'COMM-LINK 01',
    longitude: -3.7038,
    latitude: 40.4168,
    url: '/contact'
  }, //Madrid
  {
    name: 'OPS-CATALOG 02',
    longitude: -77.0369,
    latitude: 38.9072,
    url: '/projects'
  }, //Washington
  {
    name: 'SERVICE RECORD 03',
    longitude: 114.0579,
    latitude: 22.5431,
    url: '/achievements'
  }, //Shenzhen
  {
    name: 'DOSSIER 04',
    longitude: 139.6917,
    latitude: 35.6895,
    url: '/about'
  }, //Tokyo
  {
    name: 'BLACK-OPS LAB 05',
    longitude: 37.6173,
    latitude: 55.7558,
    url: '/experiments'
  }, //Tokyo
  {
    name: 'COMMAND UPLINK 06',
    longitude: 50.6173,
    latitude: -80.7558,
    url: '/news'
  }, //Tokyo
  {
    name: 'ARCHIVE ACCESS 07',
    longitude: 290.6173,
    latitude: -10.7558,
    url: '/documents'
  },
  {
    name: 'OP-STATUS 08',
    longitude: 37.6173,
    latitude: 1.7558,
    url: '/availability'
  } //Moscow
]

defineExpose({
  goToPoint(name: string) {
    goToPoint(name)
  }
})

onMounted(() => {
  if (mainSvg.value != null) {
    mapRenderer = new MapRenderer({
      svg: mainSvg.value,
      displayablePoints: dataPoints,
      offset: 30
    })
  }

  setInterval(() => {
    messageList.value.push(GetRandomConsoleMessage())
    if (messageList.value.length > 5) {
      messageList.value.shift()
    }
    console.log(messageList.value)
  }, 1000)
})

onBeforeUnmount(() => {
  mapRenderer?.End()
})

function goToPoint(name: string) {
  mapRenderer?.GoToDisplayablePoint(name)
  //Test Comment
}

const warningMessages = [
  'High memory usage detected.',
  'Unstable network connection.',
  'Unauthorized access attempt blocked.',
  'Disk space running low.',
  'Temperature threshold exceeded.',
  'Process took too long to respond.',
  'Suspicious activity detected.',
  'Checksum mismatch found.',
  'Data packet corrupted.',
  'Power supply fluctuation detected.'
]

const systemMessages = [
  'System reboot initiated.',
  'Configuration changes applied.',
  'Updates installed successfully.',
  'Background services restarted.',
  'System diagnostics completed.',
  'Temporary files cleaned up.',
  'New device driver loaded.',
  'System clock synchronized.',
  'Kernel modules recompiled.',
  'Operation completed successfully.'
]

const authMessages = [
  'User login successful.',
  'User logout initiated.',
  'Password change requested.',
  'Multi-factor authentication passed.',
  'Invalid login attempt detected.',
  'User session expired.',
  'Access token refreshed.',
  'Permission granted.',
  'Permission denied.'
]

const networkMessages = [
  'Network connection established.',
  'Packet loss detected.',
  'Latency issues reported.',
  'DNS query resolved.',
  'Connection handshake completed.',
  'Uplink channel synchronized.',
  'Downlink stable at 512kbps.',
  'Firewall rules updated.',
  'VPN tunnel established.',
  'Routing table refreshed.'
]

function GetRandomConsoleMessage() {
  function GetRandomFromArray(data: string[]) {
    return data[Math.floor(Math.random() * data.length)]
  }

  const prefix = ['[SYS]', '[NET]', '[AUTH]', '[WARN]']
  let currentPrefix = GetRandomFromArray(prefix)

  let currentMessage = ''
  switch (currentPrefix) {
    case '[SYS]':
      currentMessage = GetRandomFromArray(systemMessages)
      break
    case '[NET]':
      currentMessage = GetRandomFromArray(networkMessages)
      break
    case '[AUTH]':
      currentMessage = GetRandomFromArray(authMessages)
      break
    case '[WARN]':
      currentMessage = GetRandomFromArray(warningMessages)
      break
  }

  return currentPrefix + ' ' + currentMessage
}
</script>

<style scoped></style>
