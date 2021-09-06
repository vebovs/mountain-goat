import React, { useState } from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { FaTrashAlt, FaMap } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getFavouriteHikes } from '../api/user';
import type { ObjectId } from 'mongodb';

type HikeProps = {
  nickname: string;
  hikeIds: ObjectId[];
};

const Hike = ({ nickname, hikeIds }: HikeProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data } = useQuery(
    'getHike',
    () => getFavouriteHikes(hikeIds).finally(() => setEnabled(false)),
    {
      enabled: enabled,
    },
  );

  console.log(data);

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
