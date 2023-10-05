import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set authentication status
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
