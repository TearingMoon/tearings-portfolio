import * as d3 from 'd3'

export function CreateProjection(
  radius: number,
  size: [number, number],
  rotation: [number, number]
) {
  return d3
    .geoOrthographic()
    .scale(radius)
    .translate([size[0] / 2, size[1] / 2])
    .clipAngle(90)
    .rotate(rotation)
}
