import React from 'react';
import type { LatLngExpression } from 'leaflet';
import { Circle, useMapEvent } from 'react-leaflet';

type LocationCircleProps = {
  toggle: boolean;
  toggleSlider: (toggle: boolean) => void;
  radius: number;
  point: LatLngExpression;
  setPoint: (point: LatLngExpression) => void;
};

const LocationCirle = ({
  toggle,
  toggleSlider,
  radius,
  point,
  setPoint,
}: LocationCircleProps) => {
  useMapEvent('click', (event) => {
    setPoint([event.latlng.lat, event.latlng.lng]);
    toggleSlider(true); // Opens slider
  });

  if (!toggle) return null; // If the slider is closed remove circle

  return <Circle center={point} radius={radius} />;
};

export default LocationCirle;
