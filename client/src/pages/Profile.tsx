import * as React from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Page from '../components/Page';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Profile = () => (
  <Page>
    <Box bg='white' color='black' h='full'>
      <Tabs isFitted variant='enclosed' h='full'>
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
  </Page>
);

export default Profile;
