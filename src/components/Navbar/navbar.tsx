import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-links'>
        <li><NavLink to='/'>Landing Page</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/chats'>Chats</NavLink></li>
        <li><NavLink to='/docs'>Docs</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
