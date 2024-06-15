import axios from 'axios'
import React from 'react'
import SubmitButton from './components/SubmitButton'
import useAuthentication from './hooks/useAuthentication'
import { useCurrentUser } from './hooks/useCurrentUser'
import useSafeRequest from './hooks/useSafeRequest'
import { ToastType, useToast } from './hooks/useToast'
import useUserProfile from './hooks/useUserProfile'
import Layout from './Layout'
import { Validate } from './services/validate'
import { API_URL } from './services/variables'
import { Status } from './services/schema'

export default function Profile() {
  const user = useCurrentUser().user
  const profile = useUserProfile(user?.id)
  const toast = useToast()
  const safeRequest = useSafeRequest()
  const authenticationConfig = useAuthentication()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as string
    const response = await safeRequest(async () => {
      Validate.Email(email)
      const data = { email, username, description, image, userId: user?.id, status: Status.online }
      if (!profile) {
        return await axios.post(`${API_URL}/profiles`, data, authenticationConfig)
      }
      return await axios.patch(`${API_URL}/profiles/${user?.id}`, data, authenticationConfig)
    })
    if (response?.status === 201 || response?.status === 200) {
      toast('Perfil actualizado', ToastType.success)
      return
    }
  }

  const handleDelete = async () => {
    const response = await safeRequest(async () => {
      return await axios.delete(`${API_URL}/users/${user?.id}`, authenticationConfig)
    })
    if (response?.status === 200) {
      toast('Perfil eliminado', ToastType.success)
      return
    }
  }

  return (
    <Layout limitHeight={false}>
      <div className='flex-1 flex flex-col w-full px-8 py-4 sm:max-w-md justify-center gap-2 h-fit'>
        <form
          className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
          onSubmit={handleSubmit}
        >
          <label
            className='text-md'
            htmlFor='username'
          >
            Nombre de Usuario
          </label>
          <input
            autoComplete='username'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            defaultValue={profile?.username || ''}
            id='username'
            name='username'
            placeholder='Nombre de Usuario'
            required={profile?.username === undefined}
          />
          <label
            className='text-md'
            htmlFor='email'
          >
            Correo Electrónico
          </label>
          <input
            autoComplete='email'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            defaultValue={profile?.email || ''}
            id='email'
            name='email'
            placeholder='Correo Electrónico'
            required={profile?.email === undefined}
            type='email'
          />
          <label
            className='text-md'
            htmlFor='description'
          >
            Descripción
          </label>
          <textarea
            autoComplete='description'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300 min-h-24'
            defaultValue={profile?.description || ''}
            id='description'
            name='description'
            placeholder='Descripción'
            required={profile?.description === undefined}
          />
          <label
            className='text-md'
            htmlFor='image'
          >
            Imagen de Perfil
          </label>
          <input
            autoComplete='image'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            defaultValue={profile?.image || ''}
            id='image'
            name='image'
            placeholder='Imagen de Perfil'
            required={profile?.image === undefined}
          />
          <section className='flex md:flex-row gap-2'>
            <SubmitButton className='flex-grow'>
              Actualizar Perfil
            </SubmitButton>
            <button
              className='bg-red-500 rounded-md shadow-sm px-4 text-white hover:scale-105 hover:bg-red-600 transition'
              onClick={handleDelete}
            >
              Eliminar Cuenta
            </button>
          </section>
        </form>
      </div>
    </Layout>
  )
}
