import React, { useMemo, useState, useEffect } from 'react'
import ImageGallery from './components/ImageGallery'
import Layout from './Layout'

export default function Landing() {
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
      <main className='w-full h-full flex flex-col gap-6 py-6 items-center justify-center text-gray-800 dark:text-gray-500 p-6'>

        <h2 className='text-2xl font-bold text-gray-500'>
          Bienvenido a EPA Chat
        </h2>
        <h3 className='text-lg font-normal text-gray-500'>
          ¡La app de chat dirigida para adultos mayores!
        </h3>
        <div
          className='flex items-center justify-center gap-6 max-width: 80%'
          style={{ maxWidth: '80%' }}
        >
          <ImageGallery images={images} />
        </div>
        <h2 className='text-xl font-semibold mt-6 text-gray-500'>
          ¿Qué funciones tenemos para los adultos mayores?
        </h2>
        <ul className='text-lg font-normal text-gray-500'>
          <li>
            Cambio de tamaño de letra
          </li>
          <li>
            Agrandar mensajes específicos
          </li>
          <li>
            Poder escuchar mensajes de texto en caso de no poder leerlos
          </li>
          <li>
            Transformar audio a texto para poder enviar mensajes en caso de que sea
            difícil escribir en el teclado
          </li>
          <li>
            ¡Y más!
          </li>
        </ul>
        <h3 className='text-lg font-normal text-gray-500'>
          ¿Ya estás convencid@? ¡Únete hoy!
        </h3>
        <div className='flex items-center justify-center gap-6'>
          <button
            className='bg-violet-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
            onClick={() => window.location.href = '/login'}
          >
            Iniciar Sesión
          </button>
          <button
            className='bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
            onClick={() => window.location.href = '/login'}
          >
            Registrarse
          </button>
        </div>
      </main>
    </Layout>
  )
}
