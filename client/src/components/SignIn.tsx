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
import { FaDoorClosed } from 'react-icons/fa';

const SignIn = () => {
  return (
    <Box mr='12' ml='12'>
      <FormControl mt='2'>
        <FormLabel>Username</FormLabel>
        <Input />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl mt='8'>
        <FormLabel>Password</FormLabel>
        <Input />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <Button mt='8' w='100%' colorScheme='blue' leftIcon={<FaDoorClosed />}>
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
