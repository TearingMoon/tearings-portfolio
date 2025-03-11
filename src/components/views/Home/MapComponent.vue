<template>
  <svg class="w-full h-full text-green-500" :view-box="ViewBox" ref="MainSvg"></svg>
</template>

<script setup lang="ts">
import { useTemplateRef, ref, onMounted, onBeforeUnmount } from 'vue'

const MainSvg = useTemplateRef('MainSvg')
const ViewBox = ref('0 0 100 100')

onMounted(() => {
  updateViewBox()
  window.addEventListener('resize', updateViewBox)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewBox)
})

const updateViewBox = () => {
  if (MainSvg.value) {
    const { width, height } = MainSvg.value.getBoundingClientRect()
    ViewBox.value = `0 0 ${width} ${height}`
  }
}
</script>

<style scoped></style>
