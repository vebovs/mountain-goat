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
import { FaUserPlus } from 'react-icons/fa';

const SignUp = () => {
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
      <Button mt='8' w='100%' colorScheme='blue' leftIcon={<FaUserPlus />}>
        Sign up
      </Button>
    </Box>
  );
};

export default SignUp;
