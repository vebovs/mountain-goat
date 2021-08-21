import React, { useEffect, useRef } from 'react';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import L, { GeoJSON as LeafletGeoJson } from 'leaflet';

const Path = (props: GeoJSONProps) => {
  const geoJsonLayerRef = useRef<LeafletGeoJson | null>(null);

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer) {
      layer.clearLayers().addData(props.data);
      if (props.pathOptions) layer.setStyle(props.pathOptions);
      if (props.style) layer.setStyle(props.style);
    }
  }, [props.data, props.pathOptions, props.style]);

  return (
    <GeoJSON
      data={props.data}
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
