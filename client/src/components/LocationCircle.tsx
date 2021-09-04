import React, { useEffect, useRef } from 'react';
import type { LatLngExpression, Circle as LeafletCircle } from 'leaflet';
import { Circle, useMapEvent } from 'react-leaflet';

type LocationCircleProps = {
  pathing: boolean;
  toggle: boolean;
  toggleSlider: (toggle: boolean) => void;
  radius: number;
  point: LatLngExpression;
  setPoint: (point: LatLngExpression) => void;
};

const LocationCircle = ({
  pathing,
  toggle,
  toggleSlider,
  radius,
  point,
  setPoint,
}: LocationCircleProps) => {
  const ref = useRef<LeafletCircle | null>(null);

  useMapEvent('click', (event) => {
    setPoint([event.latlng.lat, event.latlng.lng]);
    toggleSlider(true); // Opens slider
  });

  useEffect(() => {
    if (!pathing) {
      const layer = ref.current;
      if (layer) layer.bringToBack();
    }
  }, [pathing]);

  if (!toggle || pathing) return null; // If the slider is closed remove circle

  return <Circle ref={ref} center={point} radius={radius} />;
};

export default LocationCircle;
