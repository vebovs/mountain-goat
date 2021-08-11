import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Center, Link, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type PageButtonProps = {
  link: string;
  title: string;
  IconProp: IconType;
};

const PageButton = ({ link, title, IconProp }: PageButtonProps) => (
  <Link as={ReactRouterLink} to={link} style={{ textDecoration: 'none' }}>
    <Center
      bg='green.500'
      textAlign='center'
      h='full'
      _hover={{ background: 'green.600' }}
    >
      <SimpleGrid columns={2} spacing={2}>
        <Text>{title}</Text>
        <Icon as={IconProp} h='full' />
      </SimpleGrid>
    </Center>
  </Link>
);

export default PageButton;
