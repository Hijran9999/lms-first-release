// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/logo.png" alt="Site Logo" className="logo" />
        <h2 className="site-name">Learning Management System</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </>
        )}

        {user && (
          <>
            <li><Link to="/profile">My Profile</Link></li>
            <li>
              <button className="logout-btn" onClick={logout}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
