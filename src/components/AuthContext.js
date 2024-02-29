import React, { useState } from 'react';
import Title from './Title';
import Context from './Context';

const AuthProvider = ({ children }) => {
  const [tmpKey, setTmpKey] = useState(null);
  const [tmpSecret, setTmpSecret] = useState(null);
  const [usersName, setUsersName] = useState(null);

  return (
    <Context.Provider value={{ tmpKey, setTmpKey, tmpSecret, setTmpSecret, usersName, setUsersName }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
