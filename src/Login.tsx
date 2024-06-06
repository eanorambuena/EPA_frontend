import React from 'react'
import SubmitButton from './components/SubmitButton'
import Layout from './Layout'

interface Props {
  searchParams?: { message: string }
}

export default function Login({ searchParams } : Props) {
  return (
    <Layout>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen'>
        <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
          <label
            className='text-md'
            htmlFor='email'
          >
            Teléfono
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='email'
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
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='password'
            placeholder='••••••••'
            required
            type='password'
          />
          <SubmitButton className='mb-2'>
            Iniciar Sesión
          </SubmitButton>
          <button
            className='bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
          >
            Registrarse
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
