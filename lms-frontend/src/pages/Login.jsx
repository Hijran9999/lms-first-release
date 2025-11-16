// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

// const submit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await api.post("/auth/login", { email, password });

//     // res.data MUST contain full user object
//     await login(res.data.user);

//     nav("/");
//   } catch (error) {
//     setErr(error?.response?.data?.message || "Login failed");
//   }
// };

const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });

    // res.data.user contains { id, fullName, email, role }
    login(res.data.user);

    nav("/");
  } catch (error) {
    setErr(error?.response?.data?.message || "Login failed");
  }
};

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Sign In</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: 8 }}>Login</button>
      </form>
    </div>
  );
}
