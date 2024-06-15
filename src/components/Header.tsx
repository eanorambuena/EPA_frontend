import React, { useContext } from 'react'
import Navbar from './/Navbar/navbar'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../hooks/useCurrentUser'
import useUserProfile from '../hooks/useUserProfile'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const profile = useUserProfile(user?.id)

  return (
    <header className='flex items-center justify-between gap-4 p-6 bg-gray-50 dark:bg-gray-950 h-fit max-w-full'>
      <Navbar />
      {user && (
        <section className='flex gap-4 items-center'>
          <span className='hidden sm:inline-block'>
            {profile?.username ? `¡Bienvenido ${profile.username}!` : '¡Bienvenido de vuelta!'}
          </span>
          <button
            className='bg-red-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-red-600 transition'
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Cerrar sesión
          </button>
        </section>
      )}
      {!user && (
        <section className='flex gap-4 items-center'>
          <button
            className='bg-violet-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-violet-600 transition'
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </button>
          <button
            className='bg-amber-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-amber-600 transition'
            onClick={() => navigate('/signup')}
          >
            Registrarse
          </button>
        </section>
      )}
    </header>
  )
}
