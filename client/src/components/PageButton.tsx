import * as React from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {
  Center,
  Link,
  SimpleGrid,
  Text,
  Icon,
  useMediaQuery,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type PageButtonProps = {
  link: string;
  title: string;
  IconProp: IconType;
};

const PageButton = ({ link, title, IconProp }: PageButtonProps) => {
  const [isMobile] = useMediaQuery('(max-width: 520px)');

  const location = useLocation();
  const { pathname } = location;

  return (
    <Link as={ReactRouterLink} to={link} style={{ textDecoration: 'none' }}>
      <Center
        bg={pathname === link ? 'green.400' : 'green.500'}
        textAlign='center'
        h='full'
        _hover={{ background: 'green.400' }}
      >
        <SimpleGrid columns={2} spacing={2}>
          <Text fontSize={isMobile ? 'xs' : 'xl'}>{title}</Text>
          <Icon as={IconProp} h='full' />
        </SimpleGrid>
      </Center>
    </Link>
  );
};

export default PageButton;
