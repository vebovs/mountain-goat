import React, { useRef, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';
import L, { GeoJSON as LeafletGeoJson } from 'leaflet';

type FavouritePathProps = {
  data: GeoJsonObject | null;
};

const FavouritePath = ({ data }: FavouritePathProps) => {
  const geoJsonLayerRef = useRef<LeafletGeoJson | null>(null);

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer && data) layer.clearLayers().addData(data);
  }, [data, geoJsonLayerRef]);

  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonLayerRef}
      data={data}
      style={() => {
        return {
          stroke: true,
          color: '#ff9900',
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
  );
};

export default FavouritePath;
