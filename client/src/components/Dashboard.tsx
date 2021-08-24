import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Text, Button, Divider } from '@chakra-ui/react';
import { FaDoorOpen } from 'react-icons/fa';
import { useUser } from '../hooks/user';
import Hike from './Hike';
import { useQuery } from 'react-query';
import { logoutUser } from '../api/auth';

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, error, isLoading, isSuccess } = useQuery(
    'signout',
    () => logoutUser().finally(() => setEnabled(false)),
    {
      enabled: enabled,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (isSuccess) setUser(null);
  }, [isSuccess]);

  if (data) console.log(data);
  if (error) console.log(error);

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
          onClick={() => setEnabled(true)}
          isLoading={isLoading}
        >
          Sign out
        </Button>
      </Flex>
      <Divider />
      <Text mt='2'>Favourites</Text>
      <Box
        m='2'
        paddingRight='2'
        overflowY='scroll'
        overflowX='hidden'
        maxH='280px'
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
