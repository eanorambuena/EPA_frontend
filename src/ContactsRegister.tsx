import React, { useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import { API_URL } from './services/variables'

interface Props {
  searchParams?: { message: string }
}

// Definición de la función Login sin usar React.FC
function ContactRegister({ searchParams }: Props) {
  const [nickname, setNickname] = useState('')
  const [userBase, setUserBase] = useState('')
  const [userContact, setUserContact] = useState('')

  const handleRegisterContact = async (e) => {
    e.preventDefault()
    console.log(userBase)
    console.log(userContact)
    console.log(nickname)
    const config_post = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `${API_URL}/contacts`,
      data: { 'nickname': nickname, 'userBase': userBase, 'userContact': userContact}
    }

    try {
      const response_post = await axios(config_post)
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
            User base
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='userBase'
            onChange={(e) => setUserBase(e.target.value)}
            placeholder='userBase'
            required
            type='userBase'
            value={userBase}
          />
          <label
            className='text-md'
            htmlFor='password'
          >
            User Contact
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='userContact'
            onChange={(e) => setUserContact(e.target.value)}
            placeholder='userContact'
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
