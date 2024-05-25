import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../../icons/Logo'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between navbar-links bg-inherit p-2 g-2 '>
      <NavLink to='/' className='flex items-center gap-2'>
        <span className='sr-only'>Página de inicio</span>
        <h1 className='inline text-lg font-bold'>EPA Chat</h1>
        <Logo size='30' className='inline' />
      </NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/chats'>Chats</NavLink>
      <NavLink to='/docs'>Docs</NavLink>
    </nav>
  )
}

export default Navbar
