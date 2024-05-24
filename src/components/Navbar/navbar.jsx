import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><NavLink to="/" activeClassName="active">Landing Page</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/chats" activeClassName="active">Chats</NavLink></li>
        <li><NavLink to="/docs" activeClassName="active">Docs</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;