import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();  //creating context object which can be globaly accessed 

export const useAuth = () => useContext(AuthContext);  //hook that consume the AuthContext easily from any component that calls useAuth().

export const AuthProvider = ({ children }) => {
  const [tmpKey, setTmpKey] = useState(null);

  return (
    <AuthContext.Provider value={{ tmpKey, setTmpKey }}>
      {children}
    </AuthContext.Provider>
  );
};
