import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import Hike from './Hike';

const MapBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position='absolute' zIndex='overlay' bottom='0' top='0' right='0'>
      <Button
        leftIcon={<FaClipboardList />}
        colorScheme='blue'
        onClick={onOpen}
        marginRight='2'
        marginTop='4'
      >
        Hikes
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Hikes</DrawerHeader>
          <DrawerBody marginTop='4'>
            <Hike />
            <Hike />
            <Hike />
            <Hike />
            <Hike />
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MapBoard;
