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
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void;
};

const MapError = ({ errorMessage, setErrorMessage }: MapErrorProps) => {
  const [showError, SetShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) SetShowError(true);
  }, [errorMessage]);

  return (
    <Box
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
