import React, { createContext, useState } from "react";

const UserContext = createContext();

function AuthProvider({ children }) {
  const [tmpKey, setTmpKey] = useState(null);
  const [tmpSecret, setTmpSecret] = useState(null);
  const [usersName, setUsersName] = useState(null);
  const [APIKey] = useState('5LQODl7dxN1nyDqwTTra3rlbgslaV83a');
  const [APISecret] = useState('PnCFhbfsaQlBmTWlOenhlL0D1cvciyBB');

  console.log("Auth " + tmpKey);

  return (
    <UserContext.Provider value={{tmpKey, tmpSecret, usersName, APIKey, APISecret, setTmpKey, setTmpSecret, setUsersName}}>
        {children}
    </UserContext.Provider>
  );
}

export { AuthProvider, UserContext };