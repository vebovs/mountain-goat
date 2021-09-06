import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';
import L, { GeoJSON as LeafletGeoJson, LeafletMouseEvent } from 'leaflet';
import type { Polyline } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import useStableCallback from '../hooks/useStableCallback';
import { useUser } from '../hooks/user';

type PathProps = {
  data: GeoJsonObject;
  sliderStatus: boolean;
  IsFetching: boolean;
  SetPathing: (pathing: boolean) => void;
  Path: Polyline[];
  SetPath: (path: Polyline[]) => void;
};

const Path = ({
  data,
  sliderStatus,
  IsFetching,
  SetPathing,
  Path,
  SetPath,
}: PathProps) => {
  const geoJsonLayerRef = useRef<LeafletGeoJson | null>(null);

  const { user } = useUser();

  // Removes drawn geojson from reappearing after menu navigation
  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer) layer.clearLayers();
  }, []);

  // Removes previous drawn paths and replaces them with newly fetched paths
  useEffect(() => {
    if (!IsFetching && sliderStatus) {
      const layer = geoJsonLayerRef.current;
      if (layer) layer.clearLayers().addData(data);
    }
  }, [IsFetching]);

  if (!sliderStatus) {
    const layer = geoJsonLayerRef.current;
    if (layer) layer.clearLayers();
  }

  const defineFavouriteHike = (event: LeafletMouseEvent) => {
    const lineString: Polyline = event.target;
    if (!user) {
      lineString.setStyle({ interactive: false });
    } else {
      SetPathing(true);
      lineString.setStyle({ color: 'black' });
      SetPath([...Path, lineString]);
    }
  };

  const stableDefineFavouriteHike = useStableCallback(defineFavouriteHike);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      ref={geoJsonLayerRef}
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
      onEachFeature={(feature, layer) => {
        layer.on({
          click: stableDefineFavouriteHike,
        });
      }}
    />
  );
};

export default Path;
