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
      // Coordinates for the line
      const lineCoordinates = [
        [72.818302, 19.205649],
        [72.93627602340445, 18.959732630284932]
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
    });

    // Cleanup map when component is unmounted
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '90vh' }}>
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
