import React, { useState } from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  ScaleFade,
  CloseButton,
} from '@chakra-ui/react';

const ErrorPopup = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <Box mt='2'>
      <ScaleFade in={toggle}>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>yikes</AlertTitle>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            aria-label='close user registration error'
            onClick={() => setToggle(!toggle)}
          />
        </Alert>
      </ScaleFade>
    </Box>
  );
};

export default ErrorPopup;
