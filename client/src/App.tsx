import * as React from 'react';
import { ChakraProvider, Box, Grid, GridItem, theme } from '@chakra-ui/react';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid
        minH='100vh'
        templateRows='reapeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
      >
        <GridItem rowSpan={2} colSpan={1} bg='tomato' />
        <GridItem rowSpan={2} colSpan={4} bg='papayawhip' />
      </Grid>
    </Box>
  </ChakraProvider>
);
