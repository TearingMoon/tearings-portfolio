<template>
  <div class="w-full h-full relative">
    <svg class="w-full h-full text-green-500" ref="MainSvg"></svg>
    <p class="absolute bottom-0 left-0 p-2 text-green-500 flex flex-col">
      <span>Rotation speed: {{ currentRotationSpeed.toFixed(2) }}</span>
      <span>Autorotate: {{ AutoRotate }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

const MainSvg = ref<SVGSVGElement | null>(null)
let animationFrameId: number | null = null
let isResizing = false
let AutoRotate = ref(true)
let rotation: [number, number] = [0, 0] // Rotación inicial

const currentRotationSpeed = ref(0.05)
const maxRotationSpeed = 0.5

const dataPoints: [string, number, number][] = [
  ['Uplink', 20, 20],
  ['Operations', 45, 60],
  ['Systems', 30, 120],
  ['Intel', 135, 150],
  ['Alerts', 70, 210]
]

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
    if (AutoRotate.value) {
      if (currentRotationSpeed.value < maxRotationSpeed) {
        currentRotationSpeed.value += 0.01
      }

      rotation[0] += currentRotationSpeed.value
      draw()
    } else {
      currentRotationSpeed.value = 0
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
    .attr('fill', 'black')
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

  // Dibujar los puntos de interés
  svg
    .selectAll('.point')
    .data(dataPoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', (d) => {
      const projected = ortoProjection([d[2], d[1]])
      return projected ? projected[0] : -100 // Evita NaN
    })
    .attr('cy', (d) => {
      const projected = ortoProjection([d[2], d[1]])
      return projected ? projected[1] : -100
    })
    .attr('r', 5)
    .attr('fill', 'oklch(0.723 0.219 149.579)')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)
    .style('display', (d) => {
      const projected = ortoProjection([d[2], d[1]])
      return projected && projected[1] >= 0 ? 'block' : 'none' // Oculta los puntos traseros
    })

  svg
    .selectAll('.point-label')
    .data(dataPoints)
    .enter()
    .append('text')
    .attr('class', 'point-label')
    .attr('x', (d) => {
      const projected = ortoProjection([d[2], d[1]])
      return projected ? projected[0] : -100
    })
    .attr('y', (d) => {
      const projected = ortoProjection([d[2], d[1]])
      return projected ? projected[1] : -100
    })
    .attr('dy', -10) // Desplazamos el texto un poco arriba del punto
    .attr('text-anchor', 'middle') // Centra el texto
    .attr('fill', 'oklch(0.723 0.219 149.579)') // Color del texto
    .attr('font-size', 30) // Tamaño de la fuente
    .attr('font-weight', 'bold') // Fuente en negrita

    .text((d) => d[0]) // Aquí es donde muestras el nombre del punto
}

// Función para configurar el drag correctamente
function setupDrag() {
  if (!MainSvg.value) return

  const drag = d3.drag<SVGSVGElement, unknown>().on('drag', (event) => {
    AutoRotate.value = false // Detener la rotación automática al hacer drag
    rotation[0] += event.dx * 0.5 // Ajuste en X
    rotation[1] -= event.dy * 0.5 // Ajuste en Y
    draw() // Redibujar con la nueva rotación

    // Reactivar auto-rotación después de 5 segundos
    setTimeout(() => (AutoRotate.value = true), 5000)
  })

  d3.select(MainSvg.value).call(drag)
}
</script>

<style scoped></style>
