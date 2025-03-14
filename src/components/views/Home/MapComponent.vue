<template>
  <div class="w-full h-full relative">
    <svg class="w-full h-full text-green-500" ref="MainSvg"></svg>
    <div class="flex items-center justify-center w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology } from 'topojson-specification'

const MainSvg = ref<SVGSVGElement | null>(null)
let animationFrameId: number | null = null

let rotation: [number, number] = [0, -10] // Rotación inicial

const offset = 10

let land: any = null
let svg: any = null
let svgSize = { width: 0, height: 0 }
let ortoProjection: d3.GeoProjection | null = null
let path: d3.GeoPath | null = null
let radius = 0
let radiusModifier = 1
const graticule = d3.geoGraticule()
const observer = new ResizeObserver(handleResize)

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
  if (!MainSvg.value) return
  observer.observe(MainSvg.value)
  svg = d3.select(MainSvg.value)
  handleResize()
  setupDrag()
  loadWorldMap()
  draw()
})

onBeforeUnmount(() => {
  observer.disconnect()
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

function handleResize() {
  svgSize.width = MainSvg.value?.clientWidth || 500
  svgSize.height = MainSvg.value?.clientHeight || 500
  radius = Math.max(Math.min(svgSize.width, svgSize.height) / 2 - offset, offset)
  requestAnimationFrame(draw)
}

let isDrawing = false
function draw() {
  if (!MainSvg.value || isDrawing) return
  isDrawing = true
  ortoProjection = d3
    .geoOrthographic()
    .scale(radius * radiusModifier)
    .translate([svgSize.width / 2, svgSize.height / 2])
    .clipAngle(90)
    .rotate(rotation)

  path = d3.geoPath().projection(ortoProjection).pointRadius(2)

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

  const drag = d3.drag<SVGSVGElement, unknown>().on('drag', (event) => {
    if (radiusModifier !== 1) {
      d3.transition()
        .duration(2000)
        .tween('radius', () => {
          const r = d3.interpolate(radiusModifier, 1)
          return (t) => {
            radiusModifier = r(t)
            draw()
          }
        })
    }
    rotation[0] = (rotation[0] + event.dx * 0.5) % 360
    rotation[1] = (rotation[1] - event.dy * 0.5) % 360

    draw()
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
        draw()
      })
      .catch(console.error)
  }
}

function clearSvg() {
  svg.selectAll('*').remove()
}

function drawWorldMap(path: d3.GeoPath) {
  if (land != null) {
    svg
      .append('path')
      .datum(land)
      .attr('d', path)
      .style('fill', 'rgba(0, 255, 0, 0.05)')
      .attr('stroke', 'oklch(0.723 0.219 149.579)')
  }
}

function drawGraticule(path: d3.GeoPath) {
  svg
    .append('circle')
    .attr('cx', svgSize.width / 2)
    .attr('cy', svgSize.height / 2)
    .attr('r', radius * radiusModifier)
    .attr('fill', 'none')
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
    .on('click', (event: any, d: any) => goToPoint(d.name))
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
    .on('click', (event: any, d: any) => goToPoint(d.name))
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

async function goToPoint(name: string) {
  const point = dataPoints.find((p) => p.name === name)
  if (!point) return
  const invertedRotation: [number, number] = [360 - rotation[0], 360 - rotation[1]]

  // Si `radiusModifier` no es 1, primero hacemos una transición para normalizarlo
  if (radiusModifier !== 1) {
    d3.transition()
      .duration(2000)
      .tween('radius', () => {
        const r = d3.interpolate(radiusModifier, 1)
        return (t) => {
          radiusModifier = r(t)
          draw()
        }
      })
      .on('end', () => transitionToPoint(point, invertedRotation))
  } else {
    transitionToPoint(point, invertedRotation)
  }
}

function transitionToPoint(
  point: { name: string; longitude: number; latitude: number; url: string },
  invertedRotation: [number, number]
) {
  d3.transition()
    .duration(2000)
    .tween('rotate', () => {
      const r1 = d3.interpolate(rotation, [-point.longitude, -point.latitude])
      const r2 = d3.interpolate(invertedRotation, [-point.longitude, -point.latitude])

      return (t) => {
        rotation = [Math.min(r1(t)[0], r2(t)[0]), Math.min(r1(t)[1], r2(t)[1])]
        radiusModifier = 1 + t * 0.5
        draw()
      }
    })
}
</script>

<style scoped></style>
