import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
// import pinpointImage from '/src/assests/pinpoint.png';

function MapComponent() {
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

    const handleMapClick = (event) => {
      const coordinate = event.coordinate;
      const lonLat = fromLonLat(coordinate);
      const marker = new Feature({
        geometry: new Point(coordinate),
      });
      vectorSource.clear(); // Clear existing markers
      vectorSource.addFeature(marker);
      console.log('Clicked Coordinate:', lonLat);
    };

    map.on('click', handleMapClick);

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}>
      {/* This div is where the map will be rendered */}
    </div>
  );
}

export default MapComponent;
