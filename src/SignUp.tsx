import React from 'react'
import SubmitButton from './components/SubmitButton'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { Auth } from './services/schema'
import useLocalStorage from './hooks/useLocalStorage'

interface Props {
  searchParams?: { message: string }
}

export default function SignUp({ searchParams } : Props) {
  const navigate = useNavigate()
  const setAccessToken = useLocalStorage('accessToken', '')[1]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const phoneNumber = formData.get('phoneNumber') as string
    const password = formData.get('password') as string
    try {
      const accessToken = await Auth.signUp(phoneNumber, password)
      setAccessToken(accessToken)
      navigate('/')
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen'>
        <form
          className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
          onSubmit={handleSubmit}
        >
          <label
            className='text-md'
            htmlFor='phoneNumber'
          >
            Teléfono
          </label>
          <input
            autoComplete='tel'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            id='phoneNumber'
            name='phoneNumber'
            placeholder='+56912345678'
            required
          />
          <label
            className='text-md'
            htmlFor='password'
          >
            Contraseña
          </label>
          <input
            autoComplete='current-password'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            id='password'
            name='password'
            placeholder='••••••••'
            required
            type='password'
          />
          <SubmitButton className='mb-2'>
            Registrarse
          </SubmitButton>
          <button
            className='bg-amber-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-amber-600 transition'
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
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
