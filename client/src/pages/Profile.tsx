import React from 'react';
import {
  Box,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useUser } from '../hooks/user';
import Page from '../components/Page';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';

const Profile = () => {
  const { user } = useUser();

  return (
    <Page>
      <Center bg='green.50' color='black' flex='1' h='full'>
        {user ? (
          <Dashboard />
        ) : (
          <Box
            bg='white'
            borderWidth='2px'
            borderRadius='lg'
            borderColor='gray.200'
            w='600px'
            h='400px'
          >
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>Sign In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SignIn />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Center>
    </Page>
  );
};

export default Profile;
