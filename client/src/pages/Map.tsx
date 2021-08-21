import React, { useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  AttributionControl,
  GeoJSON,
} from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { findHikesWithinArea } from '../api/hike';
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
    top: lat + (dLat * 180) / Math.PI,
    bottom: lat - (dLat * 180) / Math.PI,
    right: lon + (dLon * 180) / Math.PI,
    left: lon - (dLon * 180) / Math.PI,
  };
};

const Map = () => {
  const zoom: number = 14;

  const [slider, SetSlider] = useState(true); // Opens and closes the input slider
  const [radius, SetRadius] = useState(1200); // Initial radius of circle
  const [point, SetPoint] = useState<LatLngExpression>([59.858264, 5.783487]);
  const [enabled, SetEnabled] = useState(false);

  const { data, error } = useQuery(
    'foundHikes',
    () =>
      findHikesWithinArea(createPointsFromPoint(point, radius)).finally(() =>
        SetEnabled(false),
      ),
    {
      enabled: enabled,
    },
  );

  if (error) console.log(error);
  if (data) console.log(data);

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
          {data && (
            <GeoJSON
              data={data}
              style={() => {
                return {
                  stroke: true,
                  color: '#3273DC',
                  weight: 10,
                  opacity: 0.75,
                };
              }}
              coordsToLatLng={(coords) => {
                /* 
                  Reverses lat and lon coordinates as provided by the api
                  to suit leaflet's draw methods
                */
                return new L.LatLng(coords[0], coords[1]);
              }}
            />
          )}
        </MapContainer>
        <MapBoard />
        {slider && (
          <InputSlider
            toggleSlider={SetSlider}
            radius={radius}
            setRadius={SetRadius}
            setEnabled={SetEnabled}
          />
        )}
      </Box>
    </Page>
  );
};

export default Map;
