import React, { useEffect, useState, useRef } from 'react';
import { DomEvent } from 'leaflet';
import {
  Box,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';

type MapErrorProps = {
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void;
};

const MapError = ({ errorMessage, setErrorMessage }: MapErrorProps) => {
  const [showError, SetShowError] = useState<boolean>(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  // Stops map click event from triggering when clicking on the error element
  useEffect(() => {
    if (errorRef.current) DomEvent.disableClickPropagation(errorRef.current);
  });

  useEffect(() => {
    if (errorMessage) SetShowError(true);
  }, [errorMessage]);

  return (
    <Box
      ref={errorRef}
      position='absolute'
      zIndex='overlay'
      bottom='0'
      left='40%'
      right='40%'
      marginBottom='4'
      color='black'
      minW={160}
      maxW={200}
    >
      <SlideFade in={showError}>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
          <CloseButton
            onClick={() => {
              SetShowError(false);
              setErrorMessage('');
            }}
          />
        </Alert>
      </SlideFade>
    </Box>
  );
};

export default MapError;
