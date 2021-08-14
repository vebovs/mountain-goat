import * as React from 'react';
import Page from '../components/Page';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

const Map = () => {
  const zoom: number = 14;
  return (
    <Page>
      <MapContainer
        style={{ height: '100%' }}
        center={[63.418265, 10.402862]}
        zoom={zoom}
        zoomControl={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
      </MapContainer>
    </Page>
  );
};

export default Map;
