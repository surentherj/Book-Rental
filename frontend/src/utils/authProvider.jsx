// auth.js
import { useState } from "react";

const AuthProvider = (instance) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userAuthProvider, setUserAuthProvider] = useState("");

  const loginWithCustom = () => {
    setUserIsAuthenticated(true);
    setUserAuthProvider("Basic Auth");
  };

  const logout = () => {
    localStorage.clear();
    setUserIsAuthenticated(false);
    setUserAuthProvider("");
  };

  return {
    isAuthenticated: userIsAuthenticated,
    authProvider: userAuthProvider,
    loginWithCustom,
    logout,
    setUserIsAuthenticated,
  };
};

export default AuthProvider;
