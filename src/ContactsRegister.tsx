import axios from 'axios'
import React, { useState } from 'react'
import Layout from './Layout'
import { API_URL } from './services/variables'
import useAuthentication from './hooks/useAuthentication'

interface Props {
  searchParams?: { message: string }
}

// Definición de la función Login sin usar React.FC
function ContactRegister({ searchParams }: Props) {
  const [nickname, setNickname] = useState('')
  const [userContact, setUserContact] = useState('')

  const authentication = useAuthentication()

  const handleRegisterContact = async (e) => {
    e.preventDefault()
    console.log(userContact)
    console.log(nickname)

    try {
      const response_post = await axios.post(`${API_URL}/contacts`, {'nickname': nickname, 'userContact': userContact}, authentication)
      console.log('Contacto registrado:', response_post.data)
    } catch (error) {
      console.error('Error al registrar contacto:', error)
    }
  }

  return (
    <Layout>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen'>
        <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
          <label
            className='text-md'
            htmlFor='phone'
          >
            Nickname
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='Nickname'
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Nickname'
            required
            type='Nickname'
            value={nickname}
          />
          <label
            className='text-md'
            htmlFor='password'
          >
            Número de contacto
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='userContact'
            onChange={(e) => setUserContact(e.target.value)}
            placeholder='Número de contacto'
            required
            type='userContact'
            value={userContact}
          />
          <button
            className='bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
            onClick={handleRegisterContact}
          >
            Registrar contacto
          </button>
          {searchParams?.message && (
            <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default ContactRegister
