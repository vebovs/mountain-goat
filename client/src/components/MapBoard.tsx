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
import { useUser } from '../hooks/user';
import { GeoJsonObject } from 'geojson';

type MapBoardProps = {
  setFavouriteHike: (data: GeoJsonObject | null) => void;
  drawFavouriteHike: boolean;
  setDrawFavouriteHike: (draw: boolean) => void;
};

const MapBoard = ({
  setFavouriteHike,
  drawFavouriteHike,
  setDrawFavouriteHike,
}: MapBoardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  if (!user) return null;

  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      top='0'
      right='0'
      marginBottom='100%'
    >
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
            {user.favourites.map((fav) => (
              <Hike
                key={fav.id}
                nickname={fav.nickname}
                hikeIds={fav.hike_ids}
                setFavouriteHike={setFavouriteHike}
                drawFavouriteHike={drawFavouriteHike}
                setDrawFavouriteHike={setDrawFavouriteHike}
              />
            ))}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MapBoard;
