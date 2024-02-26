import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUsername = localStorage.getItem('username');
  const [user, setUser] = useState({ username: storedUsername || '' });

  const loginUser = (username) => {
   
    setUser({ username });
    
    localStorage.setItem('username', username);
  };

  const logoutUser = () => {
    localStorage.removeItem('username');
    setUser({ username: '' });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
