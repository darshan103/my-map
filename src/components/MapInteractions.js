import React, { useEffect, useRef } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM source from OpenLayers
import VectorLayer from 'ol/layer/Vector'; // Import VectorLayer class from OpenLayers
import VectorSource from 'ol/source/Vector'; // Import VectorSource class from OpenLayers
import { Style, Fill, Stroke, Circle } from 'ol/style'; // Import Style, Fill, Stroke, and Circle classes from OpenLayers
import { Draw } from 'ol/interaction'; // Import Draw interaction from OpenLayers

function MapInteractions() {
  const mapRef = useRef(null); // Reference for the map container
  const vectorLayerRef = useRef(null); // Reference for the vector layer

  useEffect(() => {
    const map = new Map({
      // using useEffect hook to initialize the map
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

    const vectorSource = new VectorSource(); // Create a VectorSource instance for vector layers
    const vectorLayer = new VectorLayer({
      // Create a VectorLayer instance
      source: vectorSource, // Set the vector source for the layer
      style: new Style({
        // Define the style for vector features
        image: new Circle({
          // Use a circle as the marker
          radius: 6, // Set the radius of the circle
          fill: new Fill({ color: 'red' }), // Set fill color
          stroke: new Stroke({ color: 'white', width: 2 }), // Set stroke color and width
        }),
      }),
    });
    map.addLayer(vectorLayer); // Add the vector layer to the map
    vectorLayerRef.current = vectorLayer; // Store a reference to the vector layer

    const addInteractions = () => {
      // Function to add drawing interactions
      const drawSource = new VectorSource(); // Create a VectorSource instance for drawing features
      const drawLayer = new VectorLayer({
        // Create a VectorLayer instance for drawing features
        source: drawSource, // Set the vector source for the layer
      });
      map.addLayer(drawLayer); // Add the draw layer to the map

      const drawPolygon = new Draw({
        // Create a Draw interaction for drawing polygons
        source: drawSource, // Set the vector source for drawing
        type: 'Polygon', // Set the type of geometry to draw
      });

      const drawPoint = new Draw({
        // Create a Draw interaction for drawing points
        source: drawSource, // Set the vector source for drawing
        type: 'Point', // Set the type of geometry to draw
      });

      const drawLineString = new Draw({
        // Create a Draw interaction for drawing linestrings
        source: drawSource, // Set the vector source for drawing
        type: 'LineString', // Set the type of geometry to draw
      });

      map.addInteraction(drawPolygon); // Add draw polygon interaction to the map
      map.addInteraction(drawPoint); // Add draw point interaction to the map
      map.addInteraction(drawLineString); // Add draw linestring interaction to the map
    };

    addInteractions(); // Call function to add drawing interactions

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

export default MapInteractions; // Export the MapInteractions component
