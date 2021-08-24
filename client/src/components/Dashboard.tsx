import React from 'react';
import { Box, Flex, Spacer, Text, Button, Divider } from '@chakra-ui/react';
import { FaDoorOpen } from 'react-icons/fa';
import { useUser } from '../hooks/user';
import Hike from './Hike';

const Dashboard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Box bg='white' borderWidth='1px' borderRadius='lg' w='600px' maxH='400px'>
      <Flex m='2'>
        <Text>Dashboard</Text>
        <Spacer></Spacer>
        <Text>{user.username}</Text>
        <Spacer></Spacer>
        <Button
          colorScheme='blue'
          aria-label='user logout'
          leftIcon={<FaDoorOpen />}
        >
          Sign out
        </Button>
      </Flex>
      <Divider />
      <Box
        m='2'
        paddingRight='2'
        overflowY='scroll'
        overflowX='hidden'
        maxH='320px'
      >
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
        <Hike />
      </Box>
    </Box>
  );
};

export default Dashboard;
