import * as React from 'react';
import { ChakraProvider, theme, Box, Flex, Center } from '@chakra-ui/react';
import Logo from './components/Logo';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl' minH='100vh'>
      <Flex color='white' minH='100vh'>
        <Box w={200} bg='tomato' overflow='hidden'>
          <Logo />
          <Center h='full'>Menu</Center>
        </Box>
        <Box flex='1' bg='papayawhip'>
          <Center h='full'>Main content</Center>
        </Box>
      </Flex>
    </Box>
  </ChakraProvider>
);
