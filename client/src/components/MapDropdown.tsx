import React, { useState, useEffect } from 'react';
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
import type { Polyline } from 'leaflet';
import type { ObjectId } from 'mongodb';
import { Geometry } from 'geojson';

type CustomFeatureType = {
  _id: ObjectId;
  geometry: Geometry;
  type: string;
  properties: object;
};

type MapDropdownProps = {
  Path: Polyline[];
  SetPath: (path: Polyline[]) => void;
  SetPathing: (pathing: boolean) => void;
};

const MapDropdown = ({ SetPathing, Path, SetPath }: MapDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (errorStatus) {
      const interval = setInterval(() => {
        setErrorStatus(false);
        setErrorMessage('');
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [errorStatus, setErrorStatus, errorMessage, setErrorMessage]);

  return (
    <Box
      position='absolute'
      zIndex='overlay'
      top='0'
      left='50%'
      right='35%'
      marginTop='4'
      color='black'
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
                if (!nickname) {
                  setErrorStatus(true);
                  setErrorMessage('Nickname required.');
                } else {
                  const Ids = Path.map(
                    (p) => (p.feature as CustomFeatureType)._id,
                  );
                  console.log(Ids);
                }
              }}
            />
            <IconButton
              aria-label='exit favorite hike creation dropdown'
              onClick={() => {
                Path.map((p) => p.setStyle({ color: '#3273DC' }));
                SetPath([]);
                SetPathing(false);
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
