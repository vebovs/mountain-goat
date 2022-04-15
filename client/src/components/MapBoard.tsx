import React, { useEffect, useRef } from 'react';
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
import { DomEvent } from 'leaflet';

import type { FavouriteHikeData } from '../pages/Map';

type MapBoardProps = {
  favouriteHike: FavouriteHikeData | null;
  setFavouriteHike: (data: FavouriteHikeData | null) => void;
  setDrawFavouriteHike: (draw: boolean) => void;
};

const MapBoard = ({
  favouriteHike,
  setFavouriteHike,
  setDrawFavouriteHike,
}: MapBoardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const mapBoardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapBoardRef.current)
      DomEvent.disableClickPropagation(mapBoardRef.current);
  });

  if (!user) return null;

  return (
    <Box
      ref={mapBoardRef}
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
                id={fav.id}
                nickname={fav.nickname}
                hikeIds={fav.hike_ids}
                favouriteHike={favouriteHike}
                setFavouriteHike={setFavouriteHike}
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
