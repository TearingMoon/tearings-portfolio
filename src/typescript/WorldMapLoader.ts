import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology } from 'topojson-specification'

export default class WorldMapLoader {
  public static async LoadWorldMap(worldMapLocation: string) {
    d3.json(worldMapLocation)
      .then((worldMap) => {
        return (worldMap = topojson.feature(
          worldMap as Topology,
          (worldMap as Topology).objects.land
        ))
      })
      .catch((error) => {
        console.error('Error loading world map:', error)
      })
  }
}
