import React, { createContext, useState } from "react";

const UserContext = createContext();

function AuthProvider({ children }) {
  const [tmpKey, setTmpKey] = useState("4");
  const [tmpSecret, setTmpSecret] = useState("4");
  const [usersName, setUsersName] = useState("4");

  console.log("Auth " + tmpKey);

  return (
    <UserContext.Provider value={{tmpKey, tmpSecret, usersName, setTmpKey, setTmpSecret, setUsersName}}>
        {children}
    </UserContext.Provider>
  );
}

export { AuthProvider, UserContext };