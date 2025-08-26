<template>
  <div class="w-full h-full relative">
    <svg class="w-full h-full text-green-500" ref="mainSvg"></svg>
    <div class="flex items-center justify-center w-full h-full"></div>
    <!-- <div class="absolute bottom-0">fps: {{ mapRenderer?.calculated_fps }}</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MapRenderer from '@/typescript/map/MapRenderer'

const mainSvg = ref<SVGSVGElement | null>(null)

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
    url: '/alerts'
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
    url: '/alerts'
  },
  {
    name: 'OP-STATUS 08',
    longitude: 37.6173,
    latitude: 1.7558,
    url: '/alerts'
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
})

onBeforeUnmount(() => {
  mapRenderer?.End()
})

function goToPoint(name: string) {
  mapRenderer?.GoToDisplayablePoint(name)
  //Test Comment
}
</script>

<style scoped></style>
