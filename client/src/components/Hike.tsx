import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { FaMap } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getFavouriteHikes } from '../api/user';
import type { ObjectId } from 'mongodb';
import { GeoJsonObject } from 'geojson';

type HikeProps = {
  nickname: string;
  hikeIds: ObjectId[];
  setFavouriteHike: (data: GeoJsonObject | null) => void;
  setDrawFavouriteHike: (draw: boolean) => void;
};

const Hike = ({
  nickname,
  hikeIds,
  setFavouriteHike,
  setDrawFavouriteHike,
}: HikeProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data, isSuccess } = useQuery(
    'getFavouriteHike',
    () =>
      getFavouriteHikes(hikeIds).finally(() => {
        setEnabled(false);
        setDrawFavouriteHike(true);
      }),
    {
      enabled: enabled,
    },
  );

  useEffect(() => {
    if (isSuccess) setFavouriteHike(data);
  }, [isSuccess, data]);

  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>{nickname}</Text>
      </Center>
      <Spacer />
      <Box>
        <IconButton
          m='2'
          colorScheme='blue'
          aria-label='Draw hike'
          icon={<FaMap />}
          onClick={() => {
            setEnabled(true);
          }}
        />
        <IconButton
          colorScheme='gray'
          aria-label='Undraw hike'
          icon={<SmallCloseIcon />}
          onClick={() => setDrawFavouriteHike(false)}
        />
      </Box>
    </Flex>
  );
};

export default Hike;
