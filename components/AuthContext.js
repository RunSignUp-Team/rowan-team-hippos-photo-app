import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [tmpKey, setTmpKey] = useState(null);

  return (
    <AuthContext.Provider value={{ tmpKey, setTmpKey }}>
      {children}
    </AuthContext.Provider>
  );
};
