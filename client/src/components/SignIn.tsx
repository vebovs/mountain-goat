import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  ScaleFade,
  CloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { loginUser } from '../api/auth';

const SignIn = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(true);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { isError, error, isLoading, isSuccess } = useQuery(
    'signin',
    () => loginUser(username, password).finally(() => setEnabled(false)),
    {
      enabled: enabled,
    },
  );

  useEffect(() => {
    if (isError) setShowError(true);
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
      <FormControl mt='2'>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
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
          Sign up
        </Button>
      )}
      <Box mt='2'>
        <ScaleFade in={isError && showError}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error ? (error as Error).message : null}</AlertTitle>
            <CloseButton
              position='absolute'
              right='8px'
              top='8px'
              aria-label='close user registration error'
              onClick={() => setShowError(false)}
            />
          </Alert>
        </ScaleFade>
      </Box>
    </Box>
  );
};

export default SignIn;
