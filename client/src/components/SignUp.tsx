import * as React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';

const SignUp = () => {
  return (
    <Box mr='12' ml='12'>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <Button mt='2' w='100%' colorScheme='blue'>
        Sign up
      </Button>
    </Box>
  );
};

export default SignUp;
