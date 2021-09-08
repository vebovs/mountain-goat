import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import Page from '../components/Page';

const FrontPage = () => {
  return (
    <Page>
      <Center bg='white' color='black' h='full'>
        <Text>Mountain Goat</Text>
      </Center>
    </Page>
  );
};

export default FrontPage;
