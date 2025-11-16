// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

const login = (userData, token) => {
  const obj = { ...userData, token };
  setUser(obj);
  localStorage.setItem("user", JSON.stringify(obj));
};

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);
    login(res.data.user); // reuse login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
