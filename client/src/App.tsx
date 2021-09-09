import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  Box,
  Flex,
  Grid,
  GridItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { ProvideUser } from './hooks/user';
import FrontPage from './pages/FrontPage';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Info from './pages/Info';
import { FaMapMarkedAlt, FaUserAlt, FaInfoCircle } from 'react-icons/fa';
import { GiGoat } from 'react-icons/gi';
import PageButton from './components/PageButton';

export const App = () => {
  const [isMobileSize] = useMediaQuery('(max-width: 868px)');

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box textAlign='center' fontSize='xl' minH='100vh'>
          <Flex
            color='white'
            minH='100vh'
            direction={isMobileSize ? 'column-reverse' : 'row'}
          >
            <Box
              h={isMobileSize ? 180 : ''}
              w={isMobileSize ? '' : 200}
              bg='tomato'
              overflow='hidden'
              borderRight='2px'
              borderColor='green.600'
            >
              <Grid
                h='full'
                templateRows={
                  isMobileSize ? 'repeat(1, 1fr)' : 'repeat(4, 1fr)'
                }
                templateColumns={
                  isMobileSize ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'
                }
              >
                <GridItem bg='blue.500'>
                  <PageButton link='/' title='Home' IconProp={GiGoat} />
                </GridItem>
                <GridItem>
                  <PageButton
                    link='/map'
                    title='Map'
                    IconProp={FaMapMarkedAlt}
                  />
                </GridItem>
                <GridItem>
                  <PageButton
                    link='/profile'
                    title='Profile'
                    IconProp={FaUserAlt}
                  />
                </GridItem>
                <GridItem>
                  <PageButton
                    link='/info'
                    title='Info'
                    IconProp={FaInfoCircle}
                  />
                </GridItem>
              </Grid>
            </Box>
            <Box
              flex='1'
              display='flex'
              justifyContent='center'
              flexDir='column'
              bg='yellow.400'
            >
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
};
