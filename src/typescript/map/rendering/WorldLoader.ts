import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'

export async function LoadWorldMap(url: string): Promise<GeoJSON.FeatureCollection> {
  const data = await d3.json<Topology<{ land: GeometryCollection }>>(url)
  if (!data) {
    throw new Error('Failed to load world map data')
  }
  return topojson.feature(data, data.objects.land) as GeoJSON.FeatureCollection
}
