import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { FaSearch, FaRegWindowClose } from 'react-icons/fa';

type InputSliderProps = {
  toggleSlider: (toggle: boolean) => void;
  radius: number;
  setRadius: (radius: number) => void;
  setEnabled: (searching: boolean) => void;
  IsLoading: boolean;
};

const InputSlider = ({
  toggleSlider,
  radius,
  setRadius,
  setEnabled,
  IsLoading,
}: InputSliderProps) => {
  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      top='0'
      right='0'
      marginRight='9'
      marginBottom='4'
      marginTop='14'
    >
      <VStack h='full'>
        <Slider
          aria-label='slider-ex-3'
          defaultValue={radius}
          orientation='vertical'
          marginTop='4'
          onChange={(val) => setRadius(val)}
          min={800}
          max={2400}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <IconButton
          colorScheme='blue'
          aria-label='Search for hikes'
          icon={<FaSearch />}
          onClick={() => setEnabled(true)}
          isLoading={IsLoading}
        />
        <IconButton
          colorScheme='red'
          aria-label='Close slider'
          icon={<FaRegWindowClose />}
          marginBottom='4'
          onClick={() => toggleSlider(false)} // Closes slider
        />
      </VStack>
    </Box>
  );
};

export default InputSlider;
