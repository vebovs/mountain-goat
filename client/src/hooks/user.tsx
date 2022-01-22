import React, { useContext, createContext, useState } from 'react';
import { RouteProps } from 'react-router';
import type { ObjectId } from 'mongodb';

export type Favourite = {
  id: string;
  hike_ids: ObjectId[];
  nickname: string;
};

export type UserDetails = {
  _id: ObjectId;
  username: string;
  password: string;
  favourites: Favourite[];
};

type User = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
};

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
