import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology } from 'topojson-specification'

enum MapState {
  Idle = 'idle',
  Transitioning = 'transitioning',
  UserInteraction = 'user_interaction'
}

interface MapRedererParams {
  svg: SVGSVGElement
  offset?: number
  rotation?: [number, number]
  displayablePoints?: DisplayablePoint[]
  worldMapLocation?: string
}
/**
 * A class representing a map renderer.
 * @class MapRenderer
 */
export default class MapRenderer {
  sizeObserver: ResizeObserver = new ResizeObserver(this.HandleResize.bind(this))

  displayablePoints: DisplayablePoint[]

  svg: SVGSVGElement
  svgSelection: d3.Selection<SVGSVGElement, unknown, null, undefined>
  svgSize: [number, number] = [0, 0]

  sphereRadius: number
  zoom: number = 1
  get endRadius(): number {
    if (!this.sphereRadius) return 0
    if (!this.svgSize) return 0
    return this.sphereRadius * this.zoom
  }

  offset: number
  rotation: [number, number]

  worldMapLocation: string
  worldMap:
    | GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | GeoJSON.FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | null = null
  requestAnimationFrameId: number | null = null

  private canInteract: boolean = true
  private mapState: MapState = MapState.Idle

  constructor({
    svg,
    offset = 10,
    rotation = [0, -10],
    displayablePoints = [],
    worldMapLocation = '/json/land-110m.json'
  }: MapRedererParams) {
    this.svg = svg
    this.svgSelection = d3.select(svg)

    this.offset = offset
    this.rotation = rotation
    this.svgSize[0] = svg.clientWidth // Get the initial width of the SVG element
    this.svgSize[1] = svg.clientHeight // Get the initial height of the SVG element
    this.sphereRadius = this.CalculateRadius() // Calculate the radius of the initial sphere based on the SVG size and offset
    this.displayablePoints = displayablePoints
    this.worldMapLocation = worldMapLocation

    this.Start()
  }

  Start() {
    this.sizeObserver.observe(this.svg as Element)
    this.LoadWorldMap()
    this.SetUpControls()
  }

  End() {
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId)
    }
    this.sizeObserver.disconnect()
  }

  HandleResize() {
    if (this.svg) {
      const rect = this.svg.getBoundingClientRect()
      this.svgSize[0] = rect.width
      this.svgSize[1] = rect.height
      this.sphereRadius = this.CalculateRadius()
    }
    this.DrawFrame()
  }

  CalculateRadius() {
    return Math.max(Math.min(this.svgSize[0], this.svgSize[1]) / 2 - this.offset, this.offset)
  }

  SetUpControls() {
    this.SetUpDragControls()
    this.SetUpScrollControls()
  }

  SetUpDragControls() {
    const drag = d3.drag<SVGSVGElement, unknown>().on('drag', (event) => {
      if (!this.canInteract) return
      this.rotation[0] = (this.rotation[0] + event.dx * 0.5) % 360
      this.rotation[1] = (this.rotation[1] - event.dy * 0.5) % 360
      this.DrawFrame()
    })
    this.svgSelection.call(drag)
  }

  SetUpScrollControls() {
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 2])
      .on('zoom', (event) => {
        if (!this.canInteract) return
        this.zoom = event.transform.k
        this.DrawFrame()
      })
    this.svgSelection.call(zoom)
  }

  SetUpHoverControls() {}

  LoadWorldMap() {
    d3.json(this.worldMapLocation)
      .then((worldMap) => {
        this.worldMap = topojson.feature(worldMap as Topology, (worldMap as Topology).objects.land)
      })
      .catch((error) => {
        console.error('Error loading world map:', error)
      })
  }

  DrawFrame() {
    this.requestAnimationFrameId = requestAnimationFrame(this.Draw.bind(this))
  }

  rendering_delta: number = 0.1
  private lastFrameTime = performance.now()
  calculated_fps: number = 0
  isDrawing: boolean = false
  Draw() {
    if (this.isDrawing) return
    this.isDrawing = true
    this.rendering_delta = performance.now() - this.lastFrameTime
    this.lastFrameTime = performance.now()
    this.calculated_fps = Math.round(1000 / this.rendering_delta)

    const ortoProjection = d3
      .geoOrthographic()
      .scale(this.endRadius)
      .translate([this.svgSize[0] / 2, this.svgSize[1] / 2])
      .clipAngle(90)
      .rotate(this.rotation)
    const path = d3.geoPath().projection(ortoProjection).pointRadius(2)
    this.svgSelection.selectAll('*').remove() // Clear the SVG before drawing
    this.svgSelection
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `0 0 ${this.svgSize[0]} ${this.svgSize[1]}`)

    this.DrawGraticule(path)
    this.DrawWorldMap(path)
    this.DrawDisplayablePoints(ortoProjection)

    this.isDrawing = false
  }

  DrawGraticule(path: d3.GeoPath) {
    this.svgSelection
      .append('circle')
      .attr('cx', this.svgSize[0] / 2)
      .attr('cy', this.svgSize[1] / 2)
      .attr('r', this.endRadius)
      .attr('fill', 'none')
      .attr('stroke', 'oklch(0.723 0.219 149.579)')
      .attr('stroke-width', 1)

    this.svgSelection
      .append('path')
      .datum(d3.geoGraticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'oklch(0.723 0.219 149.579)')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.7)
  }

  DrawWorldMap(path: d3.GeoPath) {
    if (!this.worldMap) return
    this.svgSelection
      .append('path')
      .datum(this.worldMap)
      .attr('d', path)
      .style('fill', 'rgba(0, 255, 0, 0.05)')
      .attr('stroke', 'oklch(0.723 0.219 149.579)')
  }

  DrawDisplayablePoints(ortoProjection: d3.GeoProjection) {
    this.svgSelection
      .selectAll('.point')
      .data(this.displayablePoints)
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
      .attr('visibility', (d: Coordinate) => this.GetElementVisibility(d, ortoProjection))
      .style('cursor', 'pointer')
      .on('click', (event: any, d: DisplayablePoint) => this.GoToDisplayablePoint(d.name))

    this.svgSelection
      .selectAll('.point-label')
      .data(this.displayablePoints)
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
      .style('cursor', 'pointer')
      .text((d: any) => d.name)
      .attr('visibility', (d: Coordinate) => this.GetElementVisibility(d, ortoProjection))
      .on('click', (event: any, d: DisplayablePoint) => this.GoToDisplayablePoint(d.name))
  }

  GetElementVisibility(coordinate: Coordinate, projection: d3.GeoProjection): 'visible' | 'hidden' {
    let isVisible = false
    const stream = projection.stream({
      point() {
        isVisible = true
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
    stream.point(coordinate.longitude, coordinate.latitude)
    return isVisible ? 'visible' : 'hidden'
  }

  GoToDisplayablePoint(name: string) {
    console.log('Going to:', name)
    const point = this.displayablePoints.find((p) => p.name === name)
    if (!point) return
    this.TransitionToCoord(point)
  }

  TransitionToCoord(coord: Coordinate) {
    this.canInteract = false
    const invertedRotation: [number, number] = [360 - this.rotation[0], 360 - this.rotation[1]]
    console.log('Desired Coord:', coord)
    console.log('Inverted Rotation:', invertedRotation)

    this.canInteract = true
  }
}

/**
 * A class representing a point on the map.
 * @class DisplayablePoints
 */
export class DisplayablePoint {
  name: string
  longitude: number
  latitude: number
  url: string

  constructor(name: string, longitude: number, latitude: number, url: string) {
    this.name = name
    this.longitude = longitude
    this.latitude = latitude
    this.url = url
  }
}

class Coordinate {
  longitude: number
  latitude: number
  constructor(longitude: number, latitude: number) {
    this.longitude = longitude
    this.latitude = latitude
  }
}
