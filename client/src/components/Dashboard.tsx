import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  Collapse,
  CloseButton,
} from '@chakra-ui/react';
import { FaDoorOpen } from 'react-icons/fa';
import { useUser } from '../hooks/user';
import DashboardHike from './DashboardHike';
import { useQuery } from 'react-query';
import { logoutUser } from '../api/auth';
import { Favourite } from '../hooks/user';

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Favourite[]>([]); // Place favourites in hook to trigger re-render on update

  const { isError, error, isLoading, isSuccess } = useQuery(
    'signout',
    () => logoutUser().finally(() => setEnabled(false)),
    {
      enabled: enabled,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

  useEffect(() => {
    if (isSuccess) setUser(null);
  }, [isSuccess, setUser]);

  useEffect(() => {
    if (user?.favourites) setFavourites(user.favourites);
  }, [user?.favourites]);

  if (!user) return null;

  return (
    <Flex
      direction='column'
      bg='white'
      borderWidth='1px'
      borderRadius='lg'
      w='600px'
      h='400px'
    >
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
      <Collapse in={showError}>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{error ? (error as Error).message : null}</AlertTitle>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            aria-label='close user registration error'
            onClick={() => setShowError(false)}
          />
        </Alert>
      </Collapse>
      <Divider />
      <Text mt='2'>Favourites</Text>
      <Box m='2' overflowY='auto'>
        {favourites.map((fav) => (
          <DashboardHike
            key={fav.id}
            nickname={fav.nickname}
            hikeId={fav.id}
            userId={user._id}
            setFavourites={setFavourites}
          />
        ))}
      </Box>
    </Flex>
  );
};

export default Dashboard;
