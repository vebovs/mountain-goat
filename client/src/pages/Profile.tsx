import * as React from 'react';
import {
  Box,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Page from '../components/Page';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Profile = () => {
  return (
    <Page>
      <Center bg='green.400' color='black' h='full'>
        <Box bg='white' borderWidth='1px' borderRadius='lg' w='600px' h='400px'>
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
      </Center>
    </Page>
  );
};

export default Profile;
