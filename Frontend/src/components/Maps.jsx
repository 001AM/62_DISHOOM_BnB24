import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import { distance } from '@turf/turf'; // Import the distance function from turf.js

mapboxgl.accessToken = 'pk.eyJ1Ijoic29oYW0xMiIsImEiOiJjbG5mMThidXcwa2o4Mml0Y3IzMHh0ZzM1In0.NKrFUG12iisWBbf-TVp34g';

function Map() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v11',
      center: [72.83627602340445, 18.959732630284932],
      zoom: 10.5,
      pitch: 45,
      bearing: -15.6,
      container: 'map',
      antialias: true
    });

    map.on('load', () => {
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // Coordinates for the line
      const lineCoordinates = [
        [72.818302, 19.205649],
        [72.93627602340445, 18.959732630284932],
        [72.83627602340445, 18.959732630284932]
      ];

      // Calculate the distance between the first two coordinates
      const lineDistance = distance(
        [lineCoordinates[0][0], lineCoordinates[0][1]],
        [lineCoordinates[1][0], lineCoordinates[1][1]],
        { units: 'kilometers' }
      );

      console.log('Distance between the first two coordinates:', lineDistance, 'kilometers');

      // Create a GeoJSON source from the line coordinates
      map.addSource('lineSource', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: lineCoordinates
          }
        }
      });

      // Add a layer to display the line
      map.addLayer({
        id: 'lineLayer',
        type: 'line',
        source: 'lineSource',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 4
        }
      });

      // Add markers
      new mapboxgl.Marker({
        draggable: false
      })
        .setLngLat([72.818302, 19.205649])
        .addTo(map);
      new mapboxgl.Marker({
        draggable: false
      })
        .setLngLat([72.93627602340445, 18.959732630284932])
        .addTo(map);
      new mapboxgl.Marker({
        draggable: false
      })
        .setLngLat([72.83627602340445, 18.959732630284932])
        .addTo(map);

      // Add 3D buildings layer
      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
            'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    // Cleanup map when component is unmounted
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      <style>{`
        .mapBox {
          width: 80%; /* Adjust the width for responsiveness */
          height: 80vh; /* Adjust the height for responsiveness */
          margin: 1rem; /* Adjust the margin for spacing */
          border-radius: 1rem;
        }

        @media (max-width: 768px) {
          .mapBox {
            width: 90%;
            height: 30vh;
            border-radius: 1rem;
          }
        }
      `}</style>
      <div id='map' className='mapBox' />
    </div>
  );
}

export default Map;
