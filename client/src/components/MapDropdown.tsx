import React, { useState } from 'react';
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

type MapDropdownProps = {
  SetPathing: (pathing: boolean) => void;
};

const MapDropdown = ({ SetPathing }: MapDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(true);

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
          <FormControl>
            <FormLabel>Hike nickname</FormLabel>
            <Input type='text' />
            <FormHelperText></FormHelperText>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Flex>
            <IconButton
              aria-label='Save new favourite hike'
              colorScheme='blue'
              icon={<StarIcon />}
              mr='2'
            />
            <IconButton
              aria-label='exit favorite hike creation dropdown'
              onClick={() => SetPathing(false)}
              icon={<CloseIcon />}
            />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MapDropdown;
