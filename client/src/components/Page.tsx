import React from 'react';
import { Box } from '@chakra-ui/react';

type PageProps = {
  children: JSX.Element;
};

const Page = ({ children }: PageProps) => (
  <Box
    bg='pink.200'
    flex='1'
    display='flex'
    justifyContent='center'
    flexDir='column'
    h='full'
  >
    {children}
  </Box>
);

export default Page;
