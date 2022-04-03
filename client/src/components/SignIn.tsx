import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { loginUser } from '../api/auth';
import { useUser, UserDetails } from '../hooks/user';
import type { AxiosError } from 'axios';
import { useErrorHandler } from 'react-error-boundary';

const SignIn = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleError = useErrorHandler();

  const { setUser } = useUser();

  const { data, isError, error, isLoading, isSuccess } = useQuery<
    UserDetails,
    AxiosError
  >(
    'signin',
    () => loginUser(username, password).finally(() => setEnabled(false)),
    {
      enabled: enabled,
      cacheTime: 0,
      retry: false,
    },
  );

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) setShowSuccess(true);
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <Box mr='12' ml='12'>
      <FormControl mt='2' isInvalid={isError && error?.response?.data.user}>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <FormErrorMessage>{error?.response?.data.user}</FormErrorMessage>
      </FormControl>
      <FormControl mt='8' isInvalid={isError && error?.response?.data.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormErrorMessage>{error?.response?.data.password}</FormErrorMessage>
      </FormControl>
      {showSuccess ? (
        <IconButton
          mt='8'
          w='100%'
          colorScheme='blue'
          aria-label='user logged in'
          icon={<FaDoorOpen />}
        />
      ) : (
        <Button
          mt='8'
          w='100%'
          colorScheme='blue'
          aria-label='user login'
          leftIcon={<FaDoorClosed />}
          onClick={() => setEnabled(true)}
          isLoading={isLoading}
        >
          Sign in
        </Button>
      )}
    </Box>
  );
};

export default SignIn;
