import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';
import L, { GeoJSON as LeafletGeoJson } from 'leaflet';
import { GeoJsonObject } from 'geojson';

type PathProps = {
  data: GeoJsonObject;
  sliderStatus: boolean;
  IsFetching: boolean;
};

const Path = ({ data, sliderStatus, IsFetching }: PathProps) => {
  const geoJsonLayerRef = useRef<LeafletGeoJson | null>(null);

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
    />
  );
};

export default Path;
