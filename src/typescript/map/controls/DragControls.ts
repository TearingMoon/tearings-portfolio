import * as d3 from 'd3'

export function SetupDrag(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  onDrag: (event: any) => void,
  onInteraction: () => void
): d3.DragBehavior<SVGSVGElement, unknown, unknown> {
  const drag = d3.drag<SVGSVGElement, unknown>().on('start', onInteraction).on('drag', onDrag)
  svg.call(drag)
  return drag
}
