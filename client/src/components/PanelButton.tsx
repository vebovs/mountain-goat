import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Center, Link, Text } from '@chakra-ui/react';

type PanelButtonProps = {
  link: string;
  title: string;
};

const PanelButton = ({ link, title }: PanelButtonProps) => (
  <Link as={ReactRouterLink} to={link} style={{ textDecoration: 'none' }}>
    <Center
      bg='green.500'
      textAlign='center'
      h='full'
      _hover={{ background: 'red.600' }}
    >
      {title}
    </Center>
  </Link>
);

export default PanelButton;
