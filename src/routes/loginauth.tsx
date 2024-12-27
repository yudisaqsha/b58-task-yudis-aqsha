import { useState } from "react";

export const loginAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  
  const login = () => {
    setIsAuthenticated(true);
  };

  
  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};