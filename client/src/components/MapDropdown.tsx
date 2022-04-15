import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Collapse,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { DomEvent } from 'leaflet';
import { Geometry } from 'geojson';
import { useMutation } from 'react-query';
import { addHikeToFavourites, FavoriteHike } from '../api/user';
import { useUser } from '../hooks/user';
import { AxiosError } from 'axios';
import { useErrorHandler } from 'react-error-boundary';

import type { Polyline } from 'leaflet';
import type { ObjectId } from 'mongodb';

type CustomFeatureType = {
  _id: ObjectId;
  geometry: Geometry;
  type: string;
  properties: object;
};

type MapDropdownProps = {
  path: Polyline[];
  setPath: (path: Polyline[]) => void;
  setPathing: (pathing: boolean) => void;
};

const MapDropdown = ({ setPathing, path, setPath }: MapDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleError = useErrorHandler();

  const { user } = useUser();

  const saveHikeMutation = useMutation(
    (hike: FavoriteHike) => addHikeToFavourites(hike),
    {
      onError: (error: AxiosError) => {
        setErrorStatus(true);
        if (error.response?.status === 500) handleError(error);
        setErrorMessage(error.response?.data);
      },
      onSuccess: (data) => {
        // Add new path to current state
        const PathIds = path.map((p) => (p.feature as CustomFeatureType)._id);
        const hikeId: string = data.id;

        if (user)
          user.favourites.push({
            id: hikeId,
            nickname: nickname,
            hike_ids: PathIds,
          });

        // Reset values to prepare for new path
        setNickname('');
        path.map((p) => p.setStyle({ color: '#3273DC' }));
        setPath([]);
        setPathing(false);
      },
    },
  );

  // Stops map click event from triggering when clicking on the dropdown element
  useEffect(() => {
    if (dropdownRef.current)
      DomEvent.disableClickPropagation(dropdownRef.current);
  });

  useEffect(() => {
    if (errorStatus) {
      const interval = setInterval(() => {
        setErrorStatus(false);
        setErrorMessage('');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [errorStatus, setErrorStatus, errorMessage, setErrorMessage]);

  return (
    <Box
      ref={dropdownRef}
      position='absolute'
      zIndex='overlay'
      top='0'
      left='40%'
      right='40%'
      marginTop='4'
      color='black'
      minW={160}
      maxW={220}
    >
      <IconButton
        aria-label='Toggle create favourite hike button'
        icon={showDropdown ? <ChevronDownIcon /> : <ChevronUpIcon />}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      <Collapse in={showDropdown}>
        <Box bg='white' borderWidth='1px' borderRadius='lg' p='2' mt='2'>
          <FormControl isInvalid={errorStatus}>
            <FormLabel>Hike nickname</FormLabel>
            <Input
              type='text'
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            <FormHelperText mb='2'>
              Set a unique nickname for the hike.
            </FormHelperText>
            <FormErrorMessage mb='2'>{errorMessage}</FormErrorMessage>
          </FormControl>
          <Flex>
            <IconButton
              aria-label='Save new favourite hike'
              colorScheme='blue'
              icon={<StarIcon />}
              mr='2'
              onClick={() => {
                if (!user) {
                  setErrorStatus(true);
                  setErrorMessage('Login required.');
                } else if (!nickname) {
                  setErrorStatus(true);
                  setErrorMessage('Nickname required.');
                } else {
                  const Ids = path.map(
                    (p) => (p.feature as CustomFeatureType)._id,
                  );
                  saveHikeMutation.mutate({
                    userId: user._id,
                    pathIds: Ids,
                    name: nickname,
                  });
                }
              }}
              isLoading={saveHikeMutation.isLoading}
            />
            <IconButton
              aria-label='exit favorite hike creation dropdown'
              onClick={() => {
                path.map((p) => p.setStyle({ color: '#3273DC' }));
                setPath([]);
                setPathing(false);
              }}
              icon={<CloseIcon />}
            />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MapDropdown;
