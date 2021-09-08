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
import { ProvideUser } from './hooks/user';
import FrontPage from './pages/FrontPage';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Info from './pages/Info';
import { FaMapMarkedAlt, FaUserAlt, FaInfoCircle } from 'react-icons/fa';
import { GiGoat } from 'react-icons/gi';
import PageButton from './components/PageButton';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box textAlign='center' fontSize='xl' minH='100vh'>
        <Flex color='white' minH='100vh'>
          <Box
            w={200}
            bg='tomato'
            overflow='hidden'
            borderRight='2px'
            borderColor='green.600'
          >
            <Grid
              h='full'
              templateRows='repeat(4, 1fr)'
              templateColumns='repeat(1, 1fr)'
            >
              <GridItem bg='blue.500'>
                <PageButton link='/' title='Home' IconProp={GiGoat} />
              </GridItem>
              <GridItem>
                <PageButton link='/map' title='Map' IconProp={FaMapMarkedAlt} />
              </GridItem>
              <GridItem>
                <PageButton
                  link='/profile'
                  title='Profile'
                  IconProp={FaUserAlt}
                />
              </GridItem>
              <GridItem>
                <PageButton link='/info' title='Info' IconProp={FaInfoCircle} />
              </GridItem>
            </Grid>
          </Box>
          <Box flex='1' bg='yellow.400'>
            <ProvideUser>
              <Switch>
                <Route path='/' component={FrontPage} exact />
                <Route path='/map' component={Map} />
                <Route path='/profile' component={Profile} />
                <Route path='/info' component={Info} />
              </Switch>
            </ProvideUser>
          </Box>
        </Flex>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
);
