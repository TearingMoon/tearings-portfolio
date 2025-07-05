import * as d3 from 'd3'
import { MapState } from '../state/MapState'

export function SetupDrag(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  onDrag: (event: any) => void,
  onInteraction: () => void
) {
  const drag = d3.drag<SVGSVGElement, unknown>().on('start', onInteraction).on('drag', onDrag)
  svg.call(drag)
}
