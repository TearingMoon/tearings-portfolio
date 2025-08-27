import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology } from 'topojson-specification'

export async function LoadWorldMap(url: string): Promise<GeoJSON.FeatureCollection> {
  const data = await d3.json(url)
  return topojson.feature(
    data as Topology,
    (data as Topology).objects.land
  ) as GeoJSON.FeatureCollection
}
