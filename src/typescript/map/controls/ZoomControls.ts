import * as d3 from 'd3'

export function SetupZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  onZoom: (k: number) => void,
  onInteraction: () => void
) {
  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 2])
    .on('start', onInteraction)
    .on('zoom', (event) => onZoom(event.transform.k))
  svg.call(zoom)
}
