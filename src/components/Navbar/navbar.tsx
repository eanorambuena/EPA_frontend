import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../../icons/Logo'
import AuthContext from '../../hooks/useCurrentUser'

export default function Navbar() {
  const { user } = useContext(AuthContext)

  const protectedRoutes = (
    <>
      <NavLink to='/chats'>
        Chats
      </NavLink>
      <NavLink to='/profile'>
        Perfil
      </NavLink>
      <NavLink to='/contactRegister'>
        Contactos
      </NavLink>
      <NavLink to='/docs'>
        Docs
      </NavLink>
      {user && user.type === 'admin' && user.id === 1 && (
        <NavLink to='/admin'>
          admin
      </NavLink>
      )}
    </>
  )

  return (
    <nav className='flex items-center justify-between navbar-links bg-inherit p-2 g-2'>
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
        Nosotros
      </NavLink>
      {user && protectedRoutes}
    </nav>
  )
}
