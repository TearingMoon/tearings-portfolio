<template>
  <svg class="w-full h-full text-green-500" ref="MainSvg"></svg>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

const MainSvg = ref<SVGSVGElement | null>(null)
let animationFrameId: number | null = null
let isResizing = false
let AutoRotate = true
let rotation: [number, number] = [0, 0] // Rotación inicial

const observer = new ResizeObserver(() => {
  if (!isResizing) {
    isResizing = true
    animationFrameId = requestAnimationFrame(() => {
      draw()
      isResizing = false
    })
  }
})

onMounted(() => {
  if (!MainSvg.value) return
  observer.observe(MainSvg.value)
  setupDrag() // Asignar el evento drag
  autoRotate() // Iniciar rotación automática
  draw() // Dibujar la esfera inicial
})

onBeforeUnmount(() => {
  observer.disconnect()
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

// Función para rotación automática
function autoRotate() {
  function rotate() {
    if (AutoRotate) {
      rotation[0] += 0.1 // Ajuste de velocidad de rotación
      draw()
    }
    animationFrameId = requestAnimationFrame(rotate)
  }
  rotate()
}

function draw() {
  if (!MainSvg.value) return

  const width = MainSvg.value.clientWidth || 500
  const height = MainSvg.value.clientHeight || 500
  const offset = 10
  const radius = Math.max(Math.min(width, height) / 2 - offset, offset)

  const ortoProjection = d3
    .geoOrthographic()
    .scale(radius)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .rotate(rotation) // Aplicar la rotación actual

  const path = d3.geoPath().projection(ortoProjection)
  const graticule = d3.geoGraticule()

  const svg = d3.select(MainSvg.value)
  svg.selectAll('*').remove()
  svg.attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', `0 0 ${width} ${height}`)

  // Dibujar la esfera
  svg
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', radius)
    .attr('fill', 'none')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)

  // Dibujar el grid de la esfera
  svg
    .append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.7)
}

// Función para configurar el drag correctamente
function setupDrag() {
  if (!MainSvg.value) return

  const drag = d3.drag<SVGSVGElement, unknown>().on('drag', (event) => {
    AutoRotate = false // Detener la rotación automática al hacer drag
    rotation[0] += event.dx * 0.5 // Ajuste en X
    rotation[1] -= event.dy * 0.5 // Ajuste en Y
    draw() // Redibujar con la nueva rotación

    // Reactivar auto-rotación después de 5 segundos
    setTimeout(() => (AutoRotate = true), 2500)
  })

  d3.select(MainSvg.value).call(drag)
}
</script>

<style scoped></style>
