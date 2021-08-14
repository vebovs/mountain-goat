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
};

const InputSlider = ({ toggleSlider, radius, setRadius }: InputSliderProps) => {
  return (
    <Box
      position='absolute'
      zIndex='overlay'
      bottom='0'
      top='0'
      right='0'
      marginRight='6'
      marginBottom='4'
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
          aria-label='Search database'
          icon={<FaSearch />}
        />
        <IconButton
          colorScheme='red'
          aria-label='Search database'
          icon={<FaRegWindowClose />}
          marginBottom='4'
          onClick={() => toggleSlider(false)} // Closes slider
        />
      </VStack>
    </Box>
  );
};

export default InputSlider;
