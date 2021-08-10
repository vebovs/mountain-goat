import * as React from 'react';
import { Center } from '@chakra-ui/react';

const PanelButton = () => (
  <Center
    bg='green.500'
    textAlign='center'
    h='full'
    _hover={{ cursor: 'pointer', background: 'red.600' }}
  >
    PanelButton
  </Center>
);

export default PanelButton;
