import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Test API Auth</Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/api-status">Stato API</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">Profilo</Link>
              </li>
              <li>
                <a href="#!" onClick={logout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Registrati</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;