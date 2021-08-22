import React, { useContext, createContext, useState } from 'react';

const userContext = createContext<object | null>(null);

export const ProvideUser = ({ children }: any) => {
  const user = useProvideUser();
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};

const useProvideUser = () => {
  const [user, setUser] = useState<object | null>(null);
  return { user, setUser };
};
