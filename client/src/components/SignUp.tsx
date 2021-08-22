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
import { CheckIcon } from '@chakra-ui/icons';
import { FaUserPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { registerUser } from '../api/auth';

const SignUp = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(true);

  const { isError, error, isLoading, isSuccess } = useQuery(
    'signup',
    () => registerUser(username, password).finally(() => setEnabled(false)),
    {
      enabled: enabled,
      retry: false,
    },
  );

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

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
      {isSuccess ? (
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

export default SignUp;
