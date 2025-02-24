"use client";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const authData = window.localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setState(parsedAuthData);
      // console.log(parsedAuthData);
    }
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
