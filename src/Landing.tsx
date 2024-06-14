import React, { useEffect, useMemo, useState } from 'react'
import ImageGallery from './components/ImageGallery'
import { useCurrentUser } from './hooks/useCurrentUser'
import useUserProfile from './hooks/useUserProfile'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const user = useCurrentUser().user
  const profile = useUserProfile(user?.id)
  const navigate = useNavigate()

  const imagesDesktop = useMemo(() => [
    {
      src: '/assets/views/ChatsDesktop.png',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/views/ChatDesktop.png',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/views/LoginDesktop.png',
      title: 'Login',
      description: 'Inicia sesión o regístrate'
    }
  ], [])

  const imagesMobile = useMemo(() => [
    {
      src: '/assets/views/ChatsMobile.png',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/views/ChatMobile.png',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/views/LoginMobile.pmg',
      title: 'Login',
      description: 'Inicia sesión o regístrate'
    }
  ], [])

  const imagesTablet = useMemo(() => [
    {
      src: '/assets/views/ChatsTablet.png',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/views/ChatTablet.png',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/views/LoginTablet.png',
      title: 'Login',
      description: 'Inicia sesión o regístrate'
    }
  ], [])

  const [images, setImages] = useState(imagesDesktop)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setImages(imagesMobile)
      } else if (window.innerWidth <= 768) {
        setImages(imagesTablet)
      } else {
        setImages(imagesDesktop)
      }
    }

    // Initial check
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [imagesDesktop, imagesTablet, imagesMobile])

  return (
    <Layout
      className='p-6'
      limitHeight={false}
    >
      <main className='w-full h-full flex flex-col gap-6 py-6 items-center justify-center text-gray-800 dark:text-gray-50 p-6'>
        <h2 className='text-2xl font-bold'>
          Bienvenido a EPA Chat
        </h2>
        <h3 className='text-lg font-normal'>
          ¡La app de chat dirigida para adultos mayores!
        </h3>
        <div
          className='flex items-center justify-center gap-6 max-width: 80%'
          style={{ maxWidth: '80%' }}
        >
          <ImageGallery images={images} />
        </div>
        <h2 className='text-xl font-semibold mt-6'>
          ¿Qué funciones tenemos para los adultos mayores?
        </h2>
        <ul className='text-lg font-normal'>
          <li>
            ✅ Cambio de tamaño de letra
          </li>
          <li>
            ✅ Agrandar mensajes específicos
          </li>
          <li>
            ✅ Poder escuchar mensajes de texto en caso de no poder leerlos
          </li>
          <li>
            ✅ Transformar audio a texto para poder enviar mensajes en caso de que sea
            difícil escribir en el teclado
          </li>
          <li>
            ¡Y mucho más!
          </li>
        </ul>
        { !user && (
          <>
            <h3 className='text-lg font-normal'>
              ¿Ya estás convencid@? ¡Únete hoy!
            </h3>
            <div className='flex items-center justify-center gap-6'>
              <button
                className='bg-violet-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-violet-600 transition'
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
              <button
                className='bg-amber-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-amber-600 transition'
                onClick={() => navigate('/signup')}
              >
                Registrarse
              </button>
            </div>
          </>
        )}
        { user && profile?.username && (
          <>
            <h3 className='text-lg font-normal'>
              ¡Hola
              {' '}
              {profile.username}
              ! ¿Listo para chatear?
            </h3>
            <button
              className='bg-violet-500 rounded-md shadow-sm px-4 py-2 text-white hover:scale-105 hover:bg-violet-600 transition'
              onClick={() => navigate('/chats')}
            >
              Ir a chatear
            </button>
          </>
        )}
      </main>
    </Layout>
  )
}
