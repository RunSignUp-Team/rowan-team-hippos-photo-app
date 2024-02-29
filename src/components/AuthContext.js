import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();  //creating context object which can be globaly accessed 

export const useAuth = () => useContext(AuthContext);  //hook that consume the AuthContext easily from any component that calls useAuth().

export const AuthProvider = ({ children }) => {
  const [tmpKey, setTmpKey] = useState(null);
  const [tmpSecret, setTmpSecret] = useState(null);
  const [usersName, setUsersName] = useState(null);

  return (
    <AuthContext.Provider value={{ tmpKey, setTmpKey, tmpSecret, setTmpSecret, usersName, setUsersName }}>
      {children}
    </AuthContext.Provider>
  );
};
