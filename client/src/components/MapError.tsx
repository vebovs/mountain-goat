import React, { useEffect, useState } from 'react';
import {
  Box,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';

type MapErrorProps = {
  error: boolean;
  errorMessage: string | null;
};

const MapError = ({ error, errorMessage }: MapErrorProps) => {
  const [showError, SetShowError] = useState(false);

  useEffect(() => {
    if (error) SetShowError(true);
  }, [error]);

  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      left='45%'
      right='35%'
      marginBottom='4'
      color='black'
    >
      <SlideFade in={showError}>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
          <CloseButton onClick={() => SetShowError(false)} />
        </Alert>
      </SlideFade>
    </Box>
  );
};

export default MapError;
