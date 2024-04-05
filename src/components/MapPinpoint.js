import React, { useEffect, useRef } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM source from OpenLayers
import VectorLayer from 'ol/layer/Vector'; // Import VectorLayer class from OpenLayers
import VectorSource from 'ol/source/Vector'; // Import VectorSource class from OpenLayers
import { fromLonLat } from 'ol/proj'; // Import fromLonLat function from OpenLayers
import { Style, Icon } from 'ol/style'; // Import Style and Icon classes from OpenLayers
import { Feature } from 'ol'; // Import Feature class from OpenLayers
import { Point } from 'ol/geom'; // Import Point class from OpenLayers

import pinpointImage from '../assests/pinpoint.png'; // Import the image

function MapPinpoint() {
  const mapRef = useRef(null); // Reference for the map container
  const vectorLayerRef = useRef(null); // Reference for the vector layer

  useEffect(() => {
    // using useEffect hook to initialize the map
    const map = new Map({
      // Create a new Map instance
      target: mapRef.current, // Set the map container as the target
      layers: [
        new TileLayer({
          // Add a TileLayer with OpenStreetMap as source
          source: new OSM(),
        }),
      ],
      view: new View({
        // Set initial view parameters
        center: [0, 0], // Set the initial center of the map
        zoom: 2, // Set the initial zoom level
      }),
    });

    const vectorSource = new VectorSource(); // Create a VectorSource instance
    const vectorLayer = new VectorLayer({
      // Create a VectorLayer instance
      source: vectorSource, // Set the vector source for the layer
      style: new Style({
        // Define the style for vector features
        image: new Icon({
          // Use an icon as the marker
          src: pinpointImage, // Set the image source
          scale: 0.01, // Set the scale of the icon
        }),
      }),
    });
    map.addLayer(vectorLayer); // Add the vector layer to the map
    vectorLayerRef.current = vectorLayer; // Store a reference to the vector layer

    const handleMapClick = (event) => {
      // Event handler for map click
      const coordinate = event.coordinate; // Get the clicked coordinate
      const lonLat = fromLonLat(coordinate); // Convert clicked coordinate to lon-lat format
      const marker = new Feature({
        // Create a new feature at the clicked coordinate
        geometry: new Point(coordinate), // Set the geometry of the feature as a Point
      });
      vectorSource.clear(); // Clear existing markers
      vectorSource.addFeature(marker); // Add the new marker feature
      console.log('Clicked Coordinate:', lonLat); // Log the clicked coordinate
    };

    map.on('click', handleMapClick); // Attach click event listener to the map

    return () => {
      // Cleanup function when component unmounts
      map.dispose(); // Dispose the map instance
    };
  }, []); // Dependency array to run the effect only once on component mount

  return (
    <div
      ref={mapRef} // Set the map container reference
      style={{ width: '100%', height: '100vh' }} // Set styles for map container
      className="map-container" // Set class for map container
    >
      {/* This div is where the map will be rendered */}
    </div>
  );
}

export default MapPinpoint; // Export the MapPinpoint component
