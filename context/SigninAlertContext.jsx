"use client";

import { createContext, useContext, useState } from "react";

// Create a context
const SignInAlertContext = createContext();

// Custom hook to use the SignInAlert context
export const useSignInAlert = () => {
  return useContext(SignInAlertContext);
};

// Context provider component
export const SignInAlertProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = () => {
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return (
    <SignInAlertContext.Provider value={{ isVisible, showAlert, hideAlert }}>
      {children}
    </SignInAlertContext.Provider>
  );
};
