// // // src/contexts/AuthContext.jsx
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on refresh
//   useEffect(() => {
//     const saved = localStorage.getItem("user");
//     if (saved) setUser(JSON.parse(saved));
//   }, []);

//   const login = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import api from "../api/api"; // axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // LOGIN function (calls backend)
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  // REGISTER function
  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);

    // auto-login after registering
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  // LOGOUT
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
