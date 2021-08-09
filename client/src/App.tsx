import * as React from 'react';
import {
  ChakraProvider,
  theme,
  Box,
  Flex,
  Center,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Logo from './components/Logo';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl' minH='100vh'>
      <Flex color='white' minH='100vh'>
        <Box w={200} bg='tomato' overflow='hidden'>
          <Grid
            h='full'
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
          >
            <GridItem bg='blue.500'>
              <Logo />
            </GridItem>
            <GridItem>
              <Center h='full'>Map</Center>
            </GridItem>
            <GridItem>
              <Center h='full'>Profile</Center>
            </GridItem>
            <GridItem>
              <Center h='full'>Information</Center>
            </GridItem>
          </Grid>
        </Box>
        <Box flex='1' bg='papayawhip'>
          <Center h='full'>Main content</Center>
        </Box>
      </Flex>
    </Box>
  </ChakraProvider>
);
