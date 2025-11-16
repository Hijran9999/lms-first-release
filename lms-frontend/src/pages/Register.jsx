// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'student' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav('/');
    } catch (error) {
      setErr(error?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Sign Up</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={submit}>
        <div>
          <label>Full name</label><br />
          <input value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} required />
        </div>
        <div>
          <label>Email</label><br />
          <input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
        </div>
        <div>
          <label>Role</label><br />
          <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: 8 }}>Register</button>
      </form>
    </div>
  );
}
