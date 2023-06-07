import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export default useAuth;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
