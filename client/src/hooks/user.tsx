import React, { useContext, createContext, useState } from 'react';

// TODO: add user type
const userContext = createContext<object | null>(null);

// TODO: add correct children type
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
  const [user, setUser] = useState<object | null>(null);
  return { user, setUser };
};
