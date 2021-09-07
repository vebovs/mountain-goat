import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { FaMap } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getFavouriteHikes } from '../api/user';
import type { ObjectId } from 'mongodb';
import type { FavouriteHikeData } from '../pages/Map';

type HikeProps = {
  id: number;
  nickname: string;
  hikeIds: ObjectId[];
  favouriteHike: FavouriteHikeData | null;
  setFavouriteHike: (data: FavouriteHikeData | null) => void;
  setDrawFavouriteHike: (draw: boolean) => void;
};

const Hike = ({
  id,
  nickname,
  hikeIds,
  favouriteHike,
  setFavouriteHike,
  setDrawFavouriteHike,
}: HikeProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const { error, isError, isFetching } = useQuery(
    `getFavouriteHike${id}`,
    () =>
      getFavouriteHikes(hikeIds)
        .then((data) => {
          setFavouriteHike({ id: id, data: data });
        })
        .finally(() => {
          setEnabled(false);
          setDrawFavouriteHike(true);
        }),
    {
      enabled: enabled,
    },
  );

  useEffect(() => {
    if (isError && error) {
      setErrorText((error as Error).message);
      const interval = setInterval(() => {
        setErrorText('');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [error, isError]);

  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>{nickname}</Text>
      </Center>
      <Spacer />
      <Center>
        <Text color='red'>{errorText}</Text>
      </Center>
      <Box>
        <IconButton
          m='2'
          colorScheme='blue'
          aria-label='Draw hike'
          icon={<FaMap />}
          onClick={() => setEnabled(true)}
          isLoading={isFetching}
        />
        <IconButton
          colorScheme='gray'
          aria-label='Undraw hike'
          icon={<SmallCloseIcon />}
          onClick={() => {
            if (favouriteHike?.id === id) {
              setFavouriteHike(null);
              setDrawFavouriteHike(false);
            }
          }}
        />
      </Box>
    </Flex>
  );
};

export default Hike;
