import * as React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
} from '@chakra-ui/react';

const SignIn = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default SignIn;
