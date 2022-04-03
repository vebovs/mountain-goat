import React, { useState, useEffect } from 'react';
import type { AxiosError } from 'axios';
import { Center, Text, Link, Flex } from '@chakra-ui/react';
import Page from '../components/Page';

const Fallback = ({ error }: { error: Error }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;

      setErrorMessage(
        axiosError.message +
          '\n' +
          (axiosError.response?.statusText
            ? axiosError.response?.statusText
            : ''),
      );
    } else {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <Page>
      <Center bg='green.50' color='black' flex='1' h='full'>
        <Flex direction='column'>
          <Text fontSize='4xl' as='abbr' color='green.700'>
            Something went wrong!
          </Text>
          {errorMessage.split('\n').map((e) => (
            <Text fontSize='2xl' as='abbr' color='green.700'>
              {e}
            </Text>
          ))}
        </Flex>
      </Center>
    </Page>
  );
};

export default Fallback;
