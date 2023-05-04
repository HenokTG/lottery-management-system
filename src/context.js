import React, { useState, useContext } from 'react';

const myContext = React.createContext();

export const useGlobalContext = () => useContext(myContext);

export default function AppProvider({ children }) {
  const [profilePk, setProfilePk] = useState('*');
  const [profile, setProfile] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <myContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        profilePk,
        setProfilePk,
        profile,
        setProfile,
      }}
    >
      {children}
    </myContext.Provider>
  );
}
