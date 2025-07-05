import * as d3 from 'd3'
import type { DisplayablePoint } from '../types/DisplayablePoint'
import type { Coordinate } from '../types/Coordinate'

export function DrawGraticule(
  svg: d3.Selection<any, any, any, any>,
  path: d3.GeoPath,
  radius: number,
  size: [number, number]
) {
  svg
    .append('circle')
    .attr('cx', size[0] / 2)
    .attr('cy', size[1] / 2)
    .attr('r', radius)
    .attr('fill', 'none')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)

  svg
    .append('path')
    .datum(d3.geoGraticule())
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.7)
}

export function DrawWorldMap(
  svg: d3.Selection<any, any, any, any>,
  path: d3.GeoPath,
  worldMap:
    | GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | GeoJSON.FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>
    | null
) {
  if (!worldMap) return
  svg
    .append('path')
    .datum(worldMap)
    .attr('d', path)
    .style('fill', 'rgba(0, 255, 0, 0.05)')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
}

export function DrawDisplayablePoints(
  svg: d3.Selection<any, any, any, any>,
  ortoProjection: d3.GeoProjection,
  displayablePoints: DisplayablePoint[],
  getVisibility: (coord: Coordinate, projection: d3.GeoProjection) => 'visible' | 'hidden',
  onClick: (name: string) => void
) {
  svg
    .selectAll('.point')
    .data(displayablePoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', (d) => {
      const projected = ortoProjection([d.longitude, d.latitude])
      return projected ? projected[0] : -100
    })
    .attr('cy', (d) => {
      const projected = ortoProjection([d.longitude, d.latitude])
      return projected ? projected[1] : -100
    })
    .attr('r', 5)
    .attr('fill', 'oklch(0.723 0.219 149.579)')
    .attr('stroke', 'oklch(0.723 0.219 149.579)')
    .attr('stroke-width', 1)
    .attr('visibility', (d) => getVisibility(d, ortoProjection))
    .style('cursor', 'pointer')
    .on('click', (_, d) => onClick(d.name))

  svg
    .selectAll('.point-label')
    .data(displayablePoints)
    .enter()
    .append('text')
    .attr('class', 'point-label')
    .each(function (d) {
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
    .text((d) => d.name)
    .attr('visibility', (d) => getVisibility(d, ortoProjection))
    .on('click', (_, d) => onClick(d.name))
}

export function GetElementVisibility(
  coordinate: Coordinate,
  projection: d3.GeoProjection
): 'visible' | 'hidden' {
  let isVisible = false
  const stream = projection.stream({
    point() {
      isVisible = true
    },
    lineEnd: () => {},
    lineStart: () => {},
    polygonEnd: () => {},
    polygonStart: () => {}
  })
  stream.point(coordinate.longitude, coordinate.latitude)
  return isVisible ? 'visible' : 'hidden'
}
