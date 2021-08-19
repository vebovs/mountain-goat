import React, { useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  AttributionControl,
} from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import Page from '../components/Page';
import InputSlider from '../components/InputSlider';
import MapBoard from '../components/MapBoard';
import LocationCircle from '../components/LocationCircle';

const createPointsFromPoint = (point: LatLngExpression, radius: number) => {
  const posString = point.toString();
  const comPos = posString.indexOf(',');

  const lat = parseFloat(posString.substring(0, comPos));
  const lon = parseFloat(posString.substring(comPos + 1, posString.length));

  const eRadius = 6378137;

  const dn = radius;
  const de = radius;

  const dLat = dn / eRadius;
  const dLon = de / (eRadius * Math.cos((Math.PI * lat) / 180));

  return {
    point_top: lat + (dLat * 180) / Math.PI,
    point_bottom: lat - (dLat * 180) / Math.PI,
    point_right: lon + (dLon * 180) / Math.PI,
    point_left: lon - (dLon * 180) / Math.PI,
  };
};

const Map = () => {
  const [slider, SetSlider] = useState(true); // Opens and closes the input slider
  const [radius, SetRadius] = useState(1200); // Initial radius of circle
  const [point, SetPoint] = useState<LatLngExpression>([59.858264, 5.783487]);
  const zoom: number = 14;

  const SearchForHikes = () => {
    console.log('searching...');
    console.log(point);
    const points = createPointsFromPoint(point, radius);
    console.log(points);
  };

  return (
    <Page>
      <Box h='full'>
        <MapContainer
          style={{ height: '100%' }}
          center={[59.858264, 5.783487]}
          zoom={zoom}
          zoomControl={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <AttributionControl position='bottomleft' />
          <ZoomControl position='topleft' />
          <LocationCircle
            toggle={slider}
            toggleSlider={SetSlider}
            radius={radius}
            point={point}
            setPoint={SetPoint}
          />
        </MapContainer>
        <MapBoard />
        {slider && (
          <InputSlider
            toggleSlider={SetSlider}
            radius={radius}
            setRadius={SetRadius}
            searchForHikes={SearchForHikes}
          />
        )}
      </Box>
    </Page>
  );
};

export default Map;
