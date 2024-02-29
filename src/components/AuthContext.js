import React, { createContext, useState } from "react";

const UserContext = createContext();

function AuthProvider({ children }) {
  const [tmpKey, setTmpKey] = useState(null);
  const [tmpSecret, setTmpSecret] = useState(null);
  const [usersName, setUsersName] = useState(null);

  console.log("Auth " + tmpKey);

  return (
    <UserContext.Provider value={{tmpKey, tmpSecret, usersName, setTmpKey, setTmpSecret, setUsersName}}>
        {children}
    </UserContext.Provider>
  );
}

export { AuthProvider, UserContext };