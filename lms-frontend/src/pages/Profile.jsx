// src/pages/Profile.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  // Initialize fullName safely (only once when user exists)
  const [fullName, setFullName] = useState(() => user?.fullName || "");

  const [msg, setMsg] = useState("");

  if (!user) return <div>Loading...</div>;

  const save = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/users/${user.id}`, { fullName });

      // Update global state + persist
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMsg("Saved.");
    } catch (err) {
      console.log(err);
      setMsg("Save failed.");
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>My Profile</h2>
      <form onSubmit={save}>
        <div>
          <label>Full name</label><br />
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label><br />
          <input value={user.email} disabled />
        </div>

        <button type="submit" style={{ marginTop: 8 }}>Save</button>
      </form>

      {msg && <div>{msg}</div>}
    </div>
  );
}
