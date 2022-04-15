import React, { useContext, createContext, useState } from 'react';
import { RouteProps } from 'react-router';
import { User, UserDetails } from '../types';

const initialUser: User = {
  user: null,
  setUser: (user: UserDetails | null) => {
    return (initialUser.user = user);
  },
};

const userContext = createContext<User>(initialUser);

type ChildrenProps = {
  children: RouteProps['children'];
};

export const ProvideUser = ({ children }: ChildrenProps) => {
  const { user, setUser } = useProvideUser();
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};

const useProvideUser = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  return { user, setUser };
};
