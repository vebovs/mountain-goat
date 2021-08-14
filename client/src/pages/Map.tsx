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
  IconButton,
  VStack,
} from '@chakra-ui/react';
import Page from '../components/Page';
import { FaSearch, FaRegWindowClose } from 'react-icons/fa';

const InputSlider = () => {
  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      top='0'
      right='0'
      marginRight='6'
      marginBottom='4'
    >
      <VStack h='full'>
        <Slider
          aria-label='slider-ex-3'
          defaultValue={20}
          orientation='vertical'
          marginTop='4'
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <IconButton
          colorScheme='blue'
          aria-label='Search database'
          icon={<FaSearch />}
        />
        <IconButton
          colorScheme='red'
          aria-label='Search database'
          icon={<FaRegWindowClose />}
          marginBottom='4'
        />
      </VStack>
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
          <LocationCirle />
        </MapContainer>
        <InputSlider />
      </Box>
    </Page>
  );
};

export default Map;
