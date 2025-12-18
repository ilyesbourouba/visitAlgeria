import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-main">Visit</span>
        <span className="logo-sub">Algeria</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#experiences">Experiences</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="btn-search">🔍</button>
        <button className="btn-menu">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
