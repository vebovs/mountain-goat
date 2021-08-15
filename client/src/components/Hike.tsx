import React from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { FaTrashAlt, FaMap } from 'react-icons/fa';

const Hike = () => {
  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>Sample Text</Text>
      </Center>
      <Spacer />
      <Box>
        <IconButton
          m='2'
          colorScheme='blue'
          aria-label='Search for hikes'
          icon={<FaMap />}
        />
        <IconButton
          colorScheme='red'
          aria-label='Search for hikes'
          icon={<FaTrashAlt />}
        />
      </Box>
    </Flex>
  );
};

export default Hike;
