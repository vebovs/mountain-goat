import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  Box,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Logo from './components/Logo';
import PageButton from './components/PageButton';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
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
                <PageButton link='/' title='Map' />
              </GridItem>
              <GridItem>
                <PageButton link='/profile' title='Profile' />
              </GridItem>
              <GridItem>
                <PageButton link='/info' title='Info' />
              </GridItem>
            </Grid>
          </Box>
          <Box flex='1' bg='yellow.400'>
            <Switch>
              <Route path='/' component={Map} exact />
              <Route path='/profile' component={Profile} />
              <Route path='/info' component={Info} />
            </Switch>
          </Box>
        </Flex>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
);
