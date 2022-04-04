import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FaUserPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { registerUser } from '../api/auth';
import { useErrorHandler } from 'react-error-boundary';
import type { AxiosError } from 'axios';

const SignUp = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleError = useErrorHandler();

  const { isError, error, isLoading, isSuccess } = useQuery<string, AxiosError>(
    'signup',
    () => registerUser(username, password).finally(() => setEnabled(false)),
    {
      enabled: enabled,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (isError) {
      if (!error.response?.data) handleError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const interval = setInterval(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  return (
    <Box mr='12' ml='12'>
      <FormControl mt='2' isInvalid={isError && error.response?.data}>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <FormErrorMessage>{error?.response?.data}</FormErrorMessage>
      </FormControl>
      <FormControl mt='8'>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      {showSuccess ? (
        <IconButton
          mt='8'
          w='100%'
          colorScheme='blue'
          aria-label='user registered'
          icon={<CheckIcon />}
        />
      ) : (
        <Button
          mt='8'
          w='100%'
          colorScheme='blue'
          aria-label='register a user'
          leftIcon={<FaUserPlus />}
          onClick={() => setEnabled(true)}
          isLoading={isLoading}
        >
          Sign up
        </Button>
      )}
    </Box>
  );
};

export default SignUp;
