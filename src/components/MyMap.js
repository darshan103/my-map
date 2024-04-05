import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM source from OpenLayers

function MyMap() {
  useEffect(() => {
    // using useEffect hook to initialize the map
    const map = new Map({
      target: 'map', // Set the target element by id
      layers: [
        new TileLayer({
          // Add a TileLayer with OpenStreetMap as source
          source: new OSM(),
        }),
      ],
      view: new View({
        // Set initial view parameters
        center: [0, 0], // Set initial center of the map
        zoom: 2, // Set initial zoom level
      }),
    });

    return () => {
      // Clean when component unmounts
      map.dispose(); // Disposing the map instance
    };
  }, []); // Dependency array to run the effect only when the component is mounting

  return (
    <div id="map" style={{ width: '100%', height: '700px' }}>
      {/* This div is where the map will be rendered */}
    </div>
  );
}

export default MyMap; // Exporting MyMap component
