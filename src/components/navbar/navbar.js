import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className="logo">
          <img src="https://i.ibb.co/Chmkbqb/e178c0b8bfa6.jpg" alt="Logo" />
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <Link to="/" className="nav-btn">SEO Analysis</Link>
          <Link to="/core-vitals" className="nav-btn">Core Vitals</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
