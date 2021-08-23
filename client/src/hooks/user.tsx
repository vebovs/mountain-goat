import React, { useContext, createContext, useState } from 'react';

type UserDetails = {
  _id: string;
  username: string;
  password: string;
  favourites: object;
};

type User = {
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
};

const initialUser: User = {
  user: null,
  setUser: (user: UserDetails) => {
    return (initialUser.user = user);
  },
};

const userContext = createContext<User>(initialUser);

// TODO: add specific children type
export const ProvideUser = ({ children }: any) => {
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
