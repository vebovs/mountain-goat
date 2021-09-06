import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { FaTrashAlt, FaMap } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getFavouriteHikes } from '../api/user';
import type { ObjectId } from 'mongodb';
import { GeoJsonObject } from 'geojson';

type HikeProps = {
  nickname: string;
  hikeIds: ObjectId[];
  setFavouriteHike: (data: GeoJsonObject) => void;
};

const Hike = ({ nickname, hikeIds, setFavouriteHike }: HikeProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data, isSuccess } = useQuery(
    'getHike',
    () => getFavouriteHikes(hikeIds).finally(() => setEnabled(false)),
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
          aria-label='Map hike'
          icon={<FaMap />}
          onClick={() => setEnabled(true)}
        />
        <IconButton
          colorScheme='red'
          aria-label='Delete hike'
          icon={<FaTrashAlt />}
        />
      </Box>
    </Flex>
  );
};

export default Hike;
