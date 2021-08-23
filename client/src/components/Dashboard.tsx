import React from 'react';
import { Box } from '@chakra-ui/react';
import { useUser } from '../hooks/user';

const Dashboard = () => {
  const { user } = useUser();

  if (!user) return null;

  return <Box bg='papayawhip'>Welcome {user.username}!</Box>;
};

export default Dashboard;
