import React from 'react';
import { Box, Flex, Spacer, Text, IconButton, Center } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { FaTrashAlt } from 'react-icons/fa';

const DashboardHike = () => {
  return (
    <Flex marginBottom='2' borderBottomWidth='1px'>
      <Center>
        <Text>Sample text</Text>
      </Center>
      <Spacer />
      <Box>
        <IconButton
          colorScheme='gray'
          aria-label='Edit hike nickname'
          icon={<EditIcon />}
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

export default DashboardHike;
