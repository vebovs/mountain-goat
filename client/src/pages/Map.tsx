import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import Page from '../components/Page';
import LocationCircle from '../components/LocationCircle';
import InputSlider from '../components/InputSlider';

const Map = () => {
  const [slider, SetSlider] = useState(false); // Opens and closes the input slider
  const zoom: number = 14;

  return (
    <Page>
      <Box h='full'>
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
          <ZoomControl position='topleft' />
          <LocationCircle toggle={slider} toggleSlider={SetSlider} />
        </MapContainer>
        {slider && <InputSlider toggleSlider={SetSlider} />}
      </Box>
    </Page>
  );
};

export default Map;
