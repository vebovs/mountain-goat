import * as React from 'react';
import { Box } from '@chakra-ui/react';

type PageProps = {
  children: JSX.Element;
};

const Page = ({ children }: PageProps) => (
  <Box bg='pink.200' h='full'>
    {children}
  </Box>
);

export default Page;
