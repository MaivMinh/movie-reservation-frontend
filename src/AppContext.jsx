import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";
import profileClient from "./services/profile.js";

export const AppContext = createContext({
  accountId: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [role, setRole] = useState(null);

  function handleLogin(data) {
    const token = data.accessToken;
    localStorage.setItem("access-token", token);
    try {
      const decodedToken = jwtDecode(token);
      setAccountId(decodedToken.account_id);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
    setIsAuthenticated(true);
    getProfile();
  }

  function handleLogout() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("profile");
    setIsAuthenticated(false);
    setAccountId(null);
    setRole(null);
  }

  const getProfile = async () => {
    try {
      const response = await profileClient.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const payload = response.data;
      if (payload.status === 200) {
        const data = payload.data;
        const profile = {
          username: data.username,
          email: data.email,
          role: data.roles,
        };
        localStorage.setItem("profile", JSON.stringify(profile));
        setRole(data.roles);
      }
    } catch (error) {
      console.error("Failed to get profile:", payload.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      handleLogin({accessToken: token});
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        accountId: accountId,
        role: role,
        isAuthenticated,
        setIsAuthenticated,
        logout: handleLogout,
        login: handleLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
