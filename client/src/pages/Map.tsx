import React, { useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Circle,
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
} from 'react-leaflet';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import Page from '../components/Page';

const InputSlider = () => {
  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      top='0'
      right='0'
      marginRight='6'
    >
      <Slider aria-label='slider-ex-3' defaultValue={20} orientation='vertical'>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

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
      <Box h='full'>
        <MapContainer
          style={{ height: '100%', position: 'relative' }}
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
          <LocationCirle />
        </MapContainer>
        <InputSlider />
      </Box>
    </Page>
  );
};

export default Map;
