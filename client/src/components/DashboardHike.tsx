import React from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
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
    },
  );

  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>{nickname}</Text>
      </Center>
      <Spacer />
      <Box>
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
      </Box>
    </Flex>
  );
};

export default DashboardHike;
