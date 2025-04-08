<template>
  <div class="w-full h-full relative">
    <svg class="w-full h-full text-green-500" ref="mainSvg"></svg>
    <div class="flex items-center justify-center w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MapRenderer from '@/typescript/MapRenderer'

const mainSvg = ref<SVGSVGElement | null>(null)

const mapRenderer = ref<MapRenderer | null>(null)

const dataPoints: { name: string; longitude: number; latitude: number; url: string }[] = [
  {
    name: 'Uplink',
    longitude: -3.7038,
    latitude: 40.4168,
    url: '/uplink'
  }, //Madrid
  {
    name: 'Operations',
    longitude: -77.0369,
    latitude: 38.9072,
    url: '/operations'
  }, //Washington
  {
    name: 'Systems',
    longitude: 114.0579,
    latitude: 22.5431,
    url: '/systems'
  }, //Shenzhen
  {
    name: 'Intel',
    longitude: 139.6917,
    latitude: 35.6895,
    url: '/intel'
  }, //Tokyo
  {
    name: 'Alerts',
    longitude: 37.6173,
    latitude: 55.7558,
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
    mapRenderer.value = new MapRenderer({
      svg: mainSvg.value,
      displayablePoints: dataPoints
    })
  }
})

onBeforeUnmount(() => {
  mapRenderer.value?.End()
})

async function goToPoint(name: string) {
  mapRenderer.value?.GoToDisplayablePoint(name)
}
</script>

<style scoped></style>
