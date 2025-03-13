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
import { interpolateNumber } from 'd3-interpolate'
import * as topojson from 'topojson-client'
import type { Topology } from 'topojson-specification'

const MainSvg = ref<SVGSVGElement | null>(null)
let animationFrameId: number | null = null
let AutoRotate = ref(true)

let rotation: [number, number] = [0, -10] // Rotación inicial

const currentRotationSpeed = ref(0.005)
const maxRotationSpeed = 0.2
const offset = 10

let land: any = null
let svg: any = null
let svgSize = { width: 0, height: 0 }
let radius = 0
const graticule = d3.geoGraticule()
const observer = new ResizeObserver(handleResize)
let timeout: ReturnType<typeof setTimeout> | null = null

const dataPoints: { name: string; longitude: number; latitude: number }[] = [
  { name: 'Uplink', longitude: -3.7038, latitude: 40.4168 }, //Madrid
  { name: 'Operations', longitude: -77.0369, latitude: 38.9072 }, //Washington
  { name: 'Systems', longitude: 114.0579, latitude: 22.5431 }, //Shenzhen
  { name: 'Intel', longitude: 139.6917, latitude: 35.6895 }, //Tokyo
  { name: 'Alerts', longitude: 37.6173, latitude: 55.7558 } //Moscow
]

onMounted(() => {
  if (!MainSvg.value) return
  observer.observe(MainSvg.value)
  svg = d3.select(MainSvg.value)
  handleResize()
  setupDrag()
  autoRotate()
  loadWorldMap()
  draw()
})

onBeforeUnmount(() => {
  observer.disconnect()
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

function autoRotate() {
  function rotate() {
    if (AutoRotate.value) {
      currentRotationSpeed.value = interpolateNumber(
        currentRotationSpeed.value,
        maxRotationSpeed
      )(0.01)
      rotation[1] = interpolateNumber(rotation[1], -10)(0.01)

      rotation[0] += currentRotationSpeed.value % 360
    } else {
      currentRotationSpeed.value = interpolateNumber(currentRotationSpeed.value, 0)(0.1)
    }

    draw()
    animationFrameId = requestAnimationFrame(rotate)
  }

  rotate()
}

function handleResize() {
  svgSize.width = MainSvg.value?.clientWidth || 500
  svgSize.height = MainSvg.value?.clientHeight || 500
  radius = Math.max(Math.min(svgSize.width, svgSize.height) / 2 - offset, offset)
}

let isDrawing = false
async function draw() {
  if (!MainSvg.value || isDrawing) return
  isDrawing = true
  const ortoProjection = d3
    .geoOrthographic()
    .scale(radius)
    .translate([svgSize.width / 2, svgSize.height / 2])
    .clipAngle(90)
    .rotate(rotation)

  const path = d3.geoPath().projection(ortoProjection).pointRadius(2)

  clearSvg()
  svg
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', `0 0 ${svgSize.width} ${svgSize.height}`)

  drawGraticule(path)
  drawWorldMap(path)
  drawPoints(path, ortoProjection)

  isDrawing = false
}

function setupDrag() {
  if (!MainSvg.value) return
  const drag = d3
    .drag<SVGSVGElement, unknown>()
    .on('drag', (event) => {
      AutoRotate.value = false
      rotation[0] += (event.dx * 0.5) % 360
      rotation[1] -= (event.dy * 0.5) % 360
      draw()
    })
    .on('end', () => {
      if (timeout != null) clearTimeout(timeout)
      timeout = setTimeout(() => (AutoRotate.value = true), 5000)
    })

  d3.select(MainSvg.value).call(drag)
}

let landPromise: Promise<any> | null = null
function loadWorldMap() {
  if (!landPromise) {
    landPromise = d3
      .json('/json/land-110m.json')
      .then((world) => {
        if (!world) throw new Error('No se pudo cargar el mapa mundial')
        land = topojson.feature(world as Topology, (world as Topology).objects.land)
      })
      .catch(console.error)
  }
}

function clearSvg() {
  svg.selectAll('*').remove()
}

function drawWorldMap(path: d3.GeoPath) {
  if (land != null)
    svg
      .append('path')
      .datum(land)
      .attr('d', path)
      .attr('fill', 'black)')
      .attr('stroke', 'oklch(0.723 0.219 149.579)')
}

function drawGraticule(path: d3.GeoPath) {
  svg
    .append('circle')
    .attr('cx', svgSize.width / 2)
    .attr('cy', svgSize.height / 2)
    .attr('r', radius)
    .attr('fill', 'black')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)

  svg
    .append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.7)
}

function drawPoints(path: d3.GeoPath, ortoProjection: d3.GeoProjection) {
  svg
    .selectAll('.point')
    .data(dataPoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', (d: any) => {
      const projected = ortoProjection([d.longitude, d.latitude])
      return projected ? projected[0] : -100
    })
    .attr('cy', (d: any) => {
      const projected = ortoProjection([d.longitude, d.latitude])
      return projected ? projected[1] : -100
    })
    .attr('r', 5)
    .attr('fill', 'oklch(0.723 0.219 149.579)')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)
    .attr('visibility', (d: any) => getVisibility(d, ortoProjection))

  svg
    .selectAll('.point-label')
    .data(dataPoints)
    .enter()
    .append('text')
    .attr('class', 'point-label')
    .each(function (this: SVGTextElement, d: any) {
      const projected = ortoProjection([d.longitude, d.latitude])
      d3.select(this)
        .attr('x', projected ? projected[0] : -100)
        .attr('y', projected ? projected[1] : -100)
    })
    .attr('dy', -10)
    .attr('text-anchor', 'middle')
    .attr('fill', 'oklch(0.723 0.219 149.579)')
    .attr('font-size', 30)
    .attr('font-weight', 'bold')
    .text((d: any) => d.name)
    .attr('visibility', (d: any) => getVisibility(d, ortoProjection))
}

function getVisibility(d: any, projection: d3.GeoProjection) {
  let visible = false
  const stream = projection.stream({
    point() {
      visible = true
    },
    lineEnd: function (): void {
      throw new Error('Function not implemented.')
    },
    lineStart: function (): void {
      throw new Error('Function not implemented.')
    },
    polygonEnd: function (): void {
      throw new Error('Function not implemented.')
    },
    polygonStart: function (): void {
      throw new Error('Function not implemented.')
    }
  })
  stream.point(d.longitude, d.latitude)

  return visible ? 'visible' : 'hidden'
}

function goToPoint(index: number) {
  if (index < 0 || index >= dataPoints.length) return
  const point = dataPoints[index]
  rotation = [point.longitude, point.latitude]
  draw()
}
</script>

<style scoped></style>
