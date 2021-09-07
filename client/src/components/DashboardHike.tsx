import React, { useState, useEffect } from 'react';
import { Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { removeHikeFromFavorites, hikeToRemove } from '../api/user';
import type { ObjectId } from 'mongodb';
import { useUser, Favourite } from '../hooks/user';

type DashboardHikeProps = {
  hikeId: number;
  userId: ObjectId;
  nickname: string;
  setFavourites: (favourites: Favourite[]) => void;
};

const DashboardHike = ({
  nickname,
  hikeId,
  userId,
  setFavourites,
}: DashboardHikeProps) => {
  const [errorText, setErrorText] = useState<string>('');
  const { user } = useUser();

  const deleteMutation = useMutation(
    (data: hikeToRemove) => removeHikeFromFavorites(data),
    {
      onSuccess: () => {
        if (user) {
          user.favourites = user.favourites.filter((fav) => fav.id !== hikeId);
          setFavourites(user?.favourites);
        }
      },
      onError: (error) => {
        setErrorText((error as Error).message);
      },
    },
  );

  useEffect(() => {
    if (errorText) {
      const interval = setInterval(() => {
        setErrorText('');
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [errorText, setErrorText]);

  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>{nickname}</Text>
      </Center>
      <Spacer />
      <Center>
        <Text color='red'>{errorText}</Text>
      </Center>
      <IconButton
        m='2'
        colorScheme='red'
        aria-label='Delete hike'
        icon={<FaTrashAlt />}
        onClick={() =>
          deleteMutation.mutate({ userId: userId, hikeId: hikeId })
        }
        isLoading={deleteMutation.isLoading}
      />
    </Flex>
  );
};

export default DashboardHike;
