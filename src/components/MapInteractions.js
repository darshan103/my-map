import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import { fromLonLat } from 'ol/proj';
// import { Polygon, LineString, Point } from 'ol/geom';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Draw } from 'ol/interaction';

// import pinpointImage from '../assests/pinpoint.png'; // Import the image

function MapInteractions() {
  const mapRef = useRef(null);
  const vectorLayerRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      }),
    });
    map.addLayer(vectorLayer);
    vectorLayerRef.current = vectorLayer;

    const addInteractions = () => {
      const drawSource = new VectorSource();
      const drawLayer = new VectorLayer({
        source: drawSource,
      });
      map.addLayer(drawLayer);

      const drawPolygon = new Draw({
        source: drawSource,
        type: 'Polygon',
      });

      const drawPoint = new Draw({
        source: drawSource,
        type: 'Point',
      });

      const drawLineString = new Draw({
        source: drawSource,
        type: 'LineString',
      });

      map.addInteraction(drawPolygon);
      map.addInteraction(drawPoint);
      map.addInteraction(drawLineString);
    };

    addInteractions();

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
      className="map-container"
    >
      {/* This div is where the map will be rendered */}
    </div>
  );
}

export default MapInteractions;
