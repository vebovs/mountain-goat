import * as React from 'react';
import { Box } from '@chakra-ui/react';
import Page from '../components/Page';
import SignIn from '../components/SignIn';

const Profile = () => (
  <Page>
    <Box bg='white' color='black'>
      <SignIn />
    </Box>
  </Page>
);

export default Profile;
