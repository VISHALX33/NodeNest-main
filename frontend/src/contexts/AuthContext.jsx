import React, { createContext, useState, useEffect } from "react";
import API from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await API.get("/scard/profile");
      setUser(res.data.profile);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
