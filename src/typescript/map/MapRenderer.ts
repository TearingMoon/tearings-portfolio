import { LoadWorldMap } from './rendering/WorldLoader'
import { CreateProjection } from './rendering/Projection'
import { SetupDrag } from './controls/DragControls'
import { SetupZoom } from './controls/ZoomControls'
import {
  DrawWorldMap,
  DrawGraticule,
  DrawDisplayablePoints,
  DrawTooltip,
  GetElementVisibility
} from './rendering/Draw'

import type { DisplayablePoint } from './types/DisplayablePoint'
import { Coordinate } from './types/Coordinate'

import router from '@/router'

import * as d3 from 'd3'

export default class MapRenderer {
  animationFrameId: number | null = null

  svgElement: SVGSVGElement
  svg: d3.Selection<any, any, any, any>

  offset: number = 0
  rotation: [number, number] = [0, 0]
  readonly initialRotation: [number, number] = [0, 0]
  size: [number, number] = [0, 0]
  _zoom: number = 1

  displayablePoints: DisplayablePoint[] = []
  worldMapLocation: string = '/json/land-110m.json'

  autoRotateEnabled: boolean = true
  userInteractionEnabled: boolean = true

  private worldMap:
    | GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | GeoJSON.FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | null = null

  private sizeObserver: ResizeObserver = new ResizeObserver(this.HandleResize.bind(this))
  private shouldRedraw: boolean = false
  private isUserInteracting: boolean = false
  private isUserHovering: boolean = false
  private interactionTimeout: number | null = null

  private zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null
  private dragBehavior: d3.DragBehavior<SVGSVGElement, unknown, unknown> | null = null

  private currentDP: DisplayablePoint | null = null

  get sphereRadius(): number {
    return Math.max(Math.min(this.size[0], this.size[1]) / 2 - this.offset, this.offset) * this.zoom
  }

  get zoom(): number {
    return this._zoom
  }

  set zoom(value: number) {
    this._zoom = value
    const currentTransform = d3.zoomTransform(this.svgElement)
    const newTransform = d3.zoomIdentity
      .translate(currentTransform.x, currentTransform.y)
      .scale(this._zoom)
    if (this.zoomBehavior) {
      this.svg.call(this.zoomBehavior.transform, newTransform)
    }
  }

  constructor({
    svg,
    offset = 10,
    rotation = [0, -10],
    displayablePoints = [],
    worldMapLocation = '/json/land-110m.json',
    autoRotateEnabled = true
  }: MapRendererParams) {
    this.svgElement = svg
    this.svg = d3.select(svg)

    this.offset = offset
    this.rotation = rotation
    this.initialRotation = rotation

    this.size[0] = svg.clientWidth // Get the initial width of the SVG element
    this.size[1] = svg.clientHeight // Get the initial height of the SVG element
    this.displayablePoints = displayablePoints
    this.worldMapLocation = worldMapLocation
    this.autoRotateEnabled = autoRotateEnabled

    this.Start()
  }

  async Start() {
    this.worldMap = await LoadWorldMap(this.worldMapLocation)

    this.sizeObserver.observe(this.svgElement as Element)
    this.dragBehavior = SetupDrag(this.svg, this.OnDrag.bind(this), () => {})
    this.zoomBehavior = SetupZoom(this.svg, this.OnZoom.bind(this), () => {})

    this.svgElement.addEventListener('mouseenter', this.OnMouseEnter.bind(this))
    this.svgElement.addEventListener('mouseleave', this.OnMouseLeave.bind(this))
    this.svgElement.addEventListener('pointerdown', this.OnPointerDown.bind(this))
    this.svgElement.addEventListener('pointerup', this.OnPointerUp.bind(this))

    this.AnimationFrameCallback()
  }

  End() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    this.sizeObserver.disconnect()

    this.svgElement.removeEventListener('mouseenter', this.OnMouseEnter.bind(this))
    this.svgElement.removeEventListener('mouseleave', this.OnMouseLeave.bind(this))
    this.svgElement.removeEventListener('pointerdown', this.OnPointerDown.bind(this))
    this.svgElement.removeEventListener('pointerup', this.OnPointerUp.bind(this))
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
    if (!this.isUserInteracting && this.autoRotateEnabled && this.currentDP === null) {
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
      (d) => {
        console.log('Point clicked :', name)
        this.GoToDisplayablePoint(d.name)
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
    if (!this.userInteractionEnabled) return
    this.shouldRedraw = true
    this.rotation[0] = (this.rotation[0] + event.dx * 0.5) % 360
    this.rotation[1] = (this.rotation[1] - event.dy * 0.5) % 360
    this.currentDP = null // Reset current point on drag
  }

  private OnZoom(k: number) {
    if (!this.userInteractionEnabled) return
    this.shouldRedraw = true
    this._zoom = k
    this.currentDP = null // Reset current point on drag
  }

  private OnMouseEnter() {
    if (!this.userInteractionEnabled) return
    this.isUserInteracting = true
    this.isUserHovering = true
    if (this.interactionTimeout) clearTimeout(this.interactionTimeout)
  }

  private OnMouseLeave() {
    if (!this.userInteractionEnabled) return
    if (this.interactionTimeout) clearTimeout(this.interactionTimeout)
    this.interactionTimeout = window.setTimeout(() => {
      this.isUserInteracting = false
    }, 2000)
    this.isUserHovering = false
  }

  private OnPointerDown() {
    if (!this.userInteractionEnabled) return
    if (!this.isUserHovering) {
      this.OnMouseEnter()
    }
  }

  private OnPointerUp() {
    if (!this.userInteractionEnabled) return
    if (!this.isUserHovering) {
      this.OnMouseLeave()
    }
  }

  GoToDisplayablePoint(name: string) {
    this.displayablePoints.forEach((point: DisplayablePoint) => {
      if (point.name === name && this.currentDP !== point) {
        this.currentDP = point
        this.TransitionToCoord(new Coordinate(point.longitude, point.latitude))
      } else if (this.currentDP === point) {
        this.currentDP = null // Reset current point if already there
      }
    })
  }

  TransitionToCoord(coord: Coordinate, duration: number = 1000) {
    this.userInteractionEnabled = false
    d3.transition()
      .duration(duration)
      .tween('rotateZoom', () => {
        const interpolator = d3.interpolateArray(this.rotation, [-coord.longitude, -coord.latitude])
        const zoomInterp = d3.interpolateNumber(this.zoom, 2) // Reset zoom to 1
        return (t: number) => {
          this.rotation = interpolator(t) as [number, number]
          this.zoom = zoomInterp(t)
          this.shouldRedraw = true
        }
      })
      .on('end', () => {
        this.userInteractionEnabled = true
        if (this.currentDP != null)
        router.push(this.currentDP.url)
      })
  }
}

export interface MapRendererParams {
  svg: SVGSVGElement
  offset?: number
  rotation?: [number, number]
  displayablePoints?: DisplayablePoint[]
  worldMapLocation?: string
  autoRotateEnabled?: boolean
}
