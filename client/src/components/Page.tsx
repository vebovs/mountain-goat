import * as React from 'react';
import { Center } from '@chakra-ui/react';

type PageProps = {
  children: JSX.Element;
};

const Page = ({ children }: PageProps) => <Center h='full'>{children}</Center>;

export default Page;
