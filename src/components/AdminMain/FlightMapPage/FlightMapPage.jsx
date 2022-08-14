/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
// eslint-disable-next-line import/no-unresolved
import mapboxgl from '!mapbox-gl'
import './FlightMapPage.css'

const FlightMapPage = ({ flights }) => {
  if (!flights[0]) {
    return <div>No Flights To Show</div>
  }
  const [currRoute, setRoute] = useState('')
  const [flightCount, setFlightCount] = useState('')
  mapboxgl.accessToken = 'pk.eyJ1IjoidG9tc21pdGg4MyIsImEiOiJjbDR3amg0dngwZnd2M3FxczAxdTJiYTNiIn0.MkEz6KZXSbiLcOBUv0dQZw'
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(122.56)
  const [lat, setLat] = useState(10.72)
  const [zoom, setZoom] = useState(7)

  useEffect(() => {
    const sortedByRoutes = []
    // sorts flights by their route ids
    for (let i = 0; i < flights.length; i += 1) {
      const route = flights[i].route.origin.name + flights[i].route.destination.name

      let check = true
      for (let i2 = 0; i2 < sortedByRoutes.length; i2 += 1) {
        const existingRoute = sortedByRoutes[i2][0].route.origin.name
        + sortedByRoutes[i2][0].route.destination.name
        if (existingRoute === route) {
          sortedByRoutes[i2].push(flights[i])
          check = false
        }
      }
      if (check) {
        sortedByRoutes[sortedByRoutes.length] = [flights[i]]
      }
    }
    console.log(sortedByRoutes)
    // empties out indexes that have no routes
    const filteredRoutes = sortedByRoutes.filter((x) => x)
    // converts sorted flights arrays into object summaries
    const summarizedRoutes = filteredRoutes.map((x) => ({
      origin: x[0].route.origin.name,
      destination: x[0].route.destination.name,
      count: x.length,
    }))
    const routesWithCoords = []
    const doStuff = async () => {
      const originToSearch = []
      const destinationToSearch = []
      // loops over all the routes and retrieves their coordinates via mapbox geocoding api
      for (let i = 0; i < summarizedRoutes.length; i += 1) {
        const splicedOrigin = summarizedRoutes[i].origin.split('(')[0].slice(0, -1).split(' ')
        let orgSearch = ''
        splicedOrigin.forEach((y) => {
          orgSearch = `${orgSearch + y}%20`
        })
        originToSearch.push(fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${orgSearch}.json?access_token=pk.eyJ1IjoidG9tc21pdGg4MyIsImEiOiJjbDR3amg0dngwZnd2M3FxczAxdTJiYTNiIn0.MkEz6KZXSbiLcOBUv0dQZw`))

        const splicedDestinations = summarizedRoutes[i].destination.split('(')[0].slice(0, -1).split(' ')
        let destinationSearch = ''
        splicedDestinations.forEach((y) => {
          destinationSearch = `${destinationSearch + y}%20`
        })
        destinationToSearch.push(fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destinationSearch}.json?access_token=pk.eyJ1IjoidG9tc21pdGg4MyIsImEiOiJjbDR3amg0dngwZnd2M3FxczAxdTJiYTNiIn0.MkEz6KZXSbiLcOBUv0dQZw&language=en`))
      }
      const returnedOriginCoords = await Promise.all(originToSearch)
      const returnedDestinationCoords = await Promise.all(destinationToSearch)
      const processRetunedOrigins = returnedOriginCoords.map((x) => x.json())
      const processRetunedDestinations = returnedDestinationCoords.map((x) => x.json())
      const origins = await Promise.all(processRetunedOrigins)
      const destinations = await Promise.all(processRetunedDestinations)

      summarizedRoutes.forEach((x, i) => {
        routesWithCoords.push({
          ...summarizedRoutes[i],
          originLong: origins[i].features[0].center[0],
          originLat: origins[i].features[0].center[1],
          destLong: destinations[i].features[0].center[0],
          destLat: destinations[i].features[0].center[1],
        })
      })

      const features = []
      // converts flights and coordinates into geojson format for mapbox
      for (let i = 0; i < routesWithCoords.length; i += 1) {
        features.push({
          type: 'Feature',
          properties: {
            count: routesWithCoords[i].count,
            route: `${routesWithCoords[i].origin} --- ${routesWithCoords[i].destination}`,
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [
                routesWithCoords[i].originLong,
                routesWithCoords[i].originLat,
              ],
              [
                routesWithCoords[i].destLong,
                routesWithCoords[i].destLat,
              ],
            ],
          },
        })
      }
      // responsible for creating the mapbox map
      if (map.current) return
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        center: [lng, lat],
        zoom,
      })
      // makes the map draggable
      if (!map.current) return
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4))
        setLat(map.current.getCenter().lat.toFixed(4))
        setZoom(map.current.getZoom().toFixed(2))
      })
      map.current.on('load', () => {
      // adds the data for the flight routes
        map.current.addSource('flights', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features,
          },
          generateId: true,
        })
        map.current.addLayer({
          id: 'flights',
          type: 'line',
          source: 'flights',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color':
            [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              '#888',
              '#888',
            ],
            'line-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              ['+', 10, ['*', 0.5, ['get', 'count']]],
              ['+', 5, ['*', 0.5, ['get', 'count']]],
            ],
          },
        })
      })
      let quakeID = null
      // handles what happens when you hover on a route
      map.current.on('mousemove', 'flights', (event) => {
        map.current.getCanvas().style.cursor = 'pointer'
        const { count } = event.features[0].properties
        const { route } = event.features[0].properties

        if (event.features.length === 0) return
        setFlightCount(count)
        setRoute(route)

        if (quakeID) {
          map.current.removeFeatureState({
            source: 'flights',
            id: quakeID,
          })
        }
        quakeID = event.features[0].id

        map.current.setFeatureState(
          {
            source: 'flights',
            id: quakeID,
          },
          {
            hover: true,
          },
        )
      })
      map.current.on('mouseleave', 'flights', () => {
        if (quakeID + 1) {
          map.current.setFeatureState(
            {
              source: 'flights',
              id: quakeID,
            },
            {
              hover: false,
            },
          )
        }
        quakeID = null
        setFlightCount('')
        setRoute('')
        map.current.getCanvas().style.cursor = ''
      })
    }
    doStuff()
  }, [flights])

  return (
    <div className="flightmap-container">
      <div ref={mapContainer} className="map-container" />
      {flightCount !== ''
        ? (
          <div className="infos">
            Route:
            {' '}
            {currRoute}
            <br />
            FlightCount:
            {' '}
            {flightCount}
          </div>
        )
        : null}
    </div>
  )
}

export default FlightMapPage
