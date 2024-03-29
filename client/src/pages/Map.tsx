import React, { useState } from 'react';
import type { LatLngExpression, Polyline } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  AttributionControl,
} from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { findHikesWithinArea } from '../api/hike';
import Page from '../components/Page';
import InputSlider from '../components/InputSlider';
import MapBoard from '../components/MapBoard';
import LocationCircle from '../components/LocationCircle';
import Path from '../components/Path';
import MapDropdown from '../components/MapDropdown';
import FavouritePath from '../components/FavouritePath';
import { useErrorHandler } from 'react-error-boundary';

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

export type FavouriteHikeData = {
  id: string;
  data: GeoJsonObject;
};

const Map = () => {
  const zoom: number = 14;
  const [slider, SetSlider] = useState<boolean>(false); // Opens and closes the input slider
  const [radius, SetRadius] = useState<number>(1200); // Initial radius of circle
  const [point, SetPoint] = useState<LatLngExpression>([59.858264, 5.783487]); // Center of the circle
  const [enabled, SetEnabled] = useState<boolean>(false);
  const [pathing, setPathing] = useState<boolean>(false); // Toggles creating favourite hike mode
  const [path, setPath] = useState<Polyline[]>([]); // Stores the new favourite hike being made
  const [favouriteHike, setFavouritehike] = useState<FavouriteHikeData | null>(
    null,
  ); // Current favourite hike to be drawn
  const [drawFavouriteHike, setDrawFavouriteHike] = useState<boolean>(false); // Toggle the curren favourite hike to be drawn or not

  const handleError = useErrorHandler();

  const { data, isFetching } = useQuery(
    'foundHikes',
    () =>
      findHikesWithinArea(createPointsFromPoint(point, radius))
        .catch((error) => {
          handleError(error);
        })
        .finally(() => SetEnabled(false)),
    {
      enabled: enabled,
    },
  );

  return (
    <Page>
      <Box flexGrow={1} display='flex' flexDir='column' h='full'>
        <MapContainer
          style={{ flexGrow: 1, height: '100%' }}
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
            pathing={pathing}
            toggle={slider}
            toggleSlider={SetSlider}
            radius={radius}
            point={point}
            setPoint={SetPoint}
          />
          <FavouritePath
            data={favouriteHike?.data}
            drawFavouritehike={drawFavouriteHike}
          />
          <Path
            data={data}
            sliderStatus={slider}
            isFetching={isFetching}
            setPathing={setPathing}
            path={path}
            setPath={setPath}
          />
          {pathing && (
            <MapDropdown
              setPathing={setPathing}
              path={path}
              setPath={setPath}
            />
          )}
          {slider && !pathing && (
            <InputSlider
              toggleSlider={SetSlider}
              radius={radius}
              setRadius={SetRadius}
              setEnabled={SetEnabled}
              loading={isFetching}
            />
          )}
          <MapBoard
            favouriteHike={favouriteHike}
            setFavouriteHike={setFavouritehike}
            setDrawFavouriteHike={setDrawFavouriteHike}
          />
        </MapContainer>
      </Box>
    </Page>
  );
};

export default Map;
