import { LoadWorldMap } from './rendering/WorldLoader'
import { CreateProjection } from './rendering/Projection'
import { SetupDrag } from './controls/DragControls'
import { SetupZoom } from './controls/ZoomControls'
import {
  DrawWorldMap,
  DrawGraticule,
  DrawDisplayablePoints,
  GetElementVisibility
} from './rendering/Draw'

import { MapState } from './state/MapState'
import type { DisplayablePoint } from './types/DisplayablePoint'
import type { Coordinate } from './types/Coordinate'

import * as d3 from 'd3'

export default class MapRenderer {
  animationFrameId: number | null = null

  svgElement: SVGSVGElement
  svg: d3.Selection<any, any, any, any>

  offset: number = 0
  rotation: [number, number] = [0, 0]
  size: [number, number] = [0, 0]
  zoom: number = 1

  displayablePoints: DisplayablePoint[] = []
  worldMapLocation: string = '/json/land-110m.json'

  private worldMap:
    | GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | GeoJSON.FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | null = null

  private sizeObserver: ResizeObserver = new ResizeObserver(this.HandleResize.bind(this))
  private shouldRedraw: boolean = false
  private isUserHovering: boolean = false

  get sphereRadius(): number {
    return Math.max(Math.min(this.size[0], this.size[1]) / 2 - this.offset, this.offset) * this.zoom
  }

  constructor({
    svg,
    offset = 10,
    rotation = [0, -10],
    displayablePoints = [],
    worldMapLocation = '/json/land-110m.json'
  }: MapRendererParams) {
    this.svgElement = svg
    this.svg = d3.select(svg)

    this.offset = offset
    this.rotation = rotation
    this.size[0] = svg.clientWidth // Get the initial width of the SVG element
    this.size[1] = svg.clientHeight // Get the initial height of the SVG element
    this.displayablePoints = displayablePoints
    this.worldMapLocation = worldMapLocation

    this.Start()
  }

  async Start() {
    this.sizeObserver.observe(this.svgElement as Element)
    this.worldMap = await LoadWorldMap(this.worldMapLocation)
    SetupDrag(this.svg, this.OnDrag.bind(this), () => {
      console.log('Drag Interaction started')
    })
    SetupZoom(this.svg, this.OnZoom.bind(this), () => {
      console.log('Zoom interaction started')
    })

    this.svgElement.addEventListener('mouseenter', () => {
      this.isUserHovering = true
    })
    this.svgElement.addEventListener('mouseleave', () => {
      this.isUserHovering = false
    })

    this.AnimationFrameCallback()
  }

  End() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    this.sizeObserver.disconnect()
  }

  private AnimationLoop() {
    if (this.shouldRedraw) {
      this.Draw()
      this.shouldRedraw = false
    }
    // Update Code here
    this.Update()
    this.AnimationFrameCallback()
  }

  private AnimationFrameCallback() {
    this.animationFrameId = requestAnimationFrame(this.AnimationLoop.bind(this))
  }

  private Update() {
    if (!this.isUserHovering) {
      this.shouldRedraw = true
      this.rotation[0] = (this.rotation[0] + 0.1) % 360 // Rotate around the Y-axis

      if (this.zoom != 1) {
        this.zoom = Math.max(1, this.zoom - 0.01) // Slowly zoom out to the original scale
      }
    }
  }

  private Draw() {
    const projection: d3.GeoProjection = CreateProjection(
      this.sphereRadius,
      this.size,
      this.rotation
    )
    const path: d3.GeoPath = d3.geoPath().projection(projection).pointRadius(2)
    this.svg.selectAll('*').remove() // Clear the SVG before drawing
    this.svg
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `0 0 ${this.size[0]} ${this.size[1]}`)

    DrawGraticule(this.svg, path, this.sphereRadius, this.size)
    DrawWorldMap(this.svg, path, this.worldMap)
    DrawDisplayablePoints(
      this.svg,
      projection,
      this.displayablePoints,
      GetElementVisibility,
      (event) => {
        console.log('Point clicked :', event)
      }
    )
  }

  private HandleResize() {
    if (this.svgElement) {
      this.shouldRedraw = true
      const rect = this.svgElement.getBoundingClientRect()
      this.size[0] = rect.width
      this.size[1] = rect.height
    }
  }

  private OnDrag(event: any) {
    this.shouldRedraw = true
    this.rotation[0] = (this.rotation[0] + event.dx * 0.5) % 360
    this.rotation[1] = (this.rotation[1] - event.dy * 0.5) % 360
  }

  private OnZoom(k: number) {
    this.shouldRedraw = true
    this.zoom = k
  }

  GoToDisplayablePoint(name: string) {
    console.log(`Going to displayable point: ${name}`)
    //TODO: Implement logic to go to the displayable point
  }
}

export interface MapRendererParams {
  svg: SVGSVGElement
  offset?: number
  rotation?: [number, number]
  displayablePoints?: DisplayablePoint[]
  worldMapLocation?: string
}
