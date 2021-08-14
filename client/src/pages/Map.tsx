import React, { useState } from 'react';
import Page from '../components/Page';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Circle,
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
} from 'react-leaflet';

const LocationCirle = () => {
  const [point, setPoint] = useState<LatLngExpression>([59.858264, 5.783487]);
  useMapEvent('click', (event) => {
    setPoint([event.latlng.lat, event.latlng.lng]);
  });
  return <Circle center={point} radius={250} />;
};

const Map = () => {
  const zoom: number = 14;

  return (
    <Page>
      <MapContainer
        style={{ height: '100%' }}
        center={[59.858264, 5.783487]}
        zoom={zoom}
        zoomControl={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <LocationCirle />
      </MapContainer>
    </Page>
  );
};

export default Map;
