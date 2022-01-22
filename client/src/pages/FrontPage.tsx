import React from 'react';
import { Center, Text, Link, Flex } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Page from '../components/Page';
import { getUser } from '../api/user';

const FrontPage = () => {
  getUser();

  return (
    <Page>
      <Center bg='green.50' color='black' flex='1' h='full'>
        <Flex direction='column'>
          <Text fontSize='6xl' as='abbr' color='green.700'>
            Mountain Goat
          </Text>
          <Link href='https://github.com/vebovs/mountain-goat' isExternal>
            GitHub <ExternalLinkIcon mx='2px' />
          </Link>
        </Flex>
      </Center>
    </Page>
  );
};

export default FrontPage;
