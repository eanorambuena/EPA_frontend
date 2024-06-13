import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../../icons/Logo'

export default function Navbar () {
  return (
    <nav className='flex items-center justify-between navbar-links bg-inherit p-2 g-2 '>
      <NavLink
        className='flex items-center gap-2'
        to='/'
      >
        <span className='sr-only'>
          Página de inicio
        </span>
        <h1 className='hidden sm:inline text-lg font-bold'>
          EPA Chat
        </h1>
        <Logo
          className='inline'
          size='30'
        />
      </NavLink>
      <NavLink to='/about'>
        About
      </NavLink>
      <NavLink to='/chats'>
        Chats
      </NavLink>
      <NavLink to='/docs'>
        Docs
      </NavLink>
      <NavLink to='/contactRegister'>
        Contacts
      </NavLink>
    </nav>
  )
}
