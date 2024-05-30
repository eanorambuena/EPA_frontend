import React, { useMemo, useState, useEffect } from 'react'
import ImageGallery from './components/ImageGallery'
import Layout from './Layout'

export default function Landing() {
  const imagesDesktop = useMemo(() => [
    {
      src: '/assets/ChatsDesktop.jpg',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/ChatDesktop.jpg',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/LoginDesktop.jpg',
      title: 'Login',
      description: 'Inicia sesión o regístrate'
    }
  ], [])

  const imagesMobile = useMemo(() => [
    {
      src: '/assets/ChatsMobile.jpg',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/ChatMobile.jpg',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/LoginMobile.jpg',
      title: 'Login',
      description: 'Inicia sesión o regístrate'
    }
  ], [])

  const imagesTablet = useMemo(() => [
    {
      src: '/assets/ChatsTablet.jpg',
      title: 'Chats',
      description: 'Mira todos tus chats en un solo lugar'
    },
    {
      src: '/assets/ChatTablet.jpg',
      title: 'Chat',
      description: 'Habla con tus amigos y familiares'
    },
    {
      src: '/assets/LoginTablet.jpg',
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
    <Layout limitHeight={false} className='p-6'>
      <main className='w-full h-full flex flex-col gap-6 py-6 items-center justify-center text-gray-800 dark:text-gray-100 p-6'>

        <h2 className='text-2xl font-bold text-gray-500'>Bienvenido a EPA Chat</h2>
        <h3 className='text-lg font-normal text-gray-500'>¡La app de chat dirigida para adultos mayores!</h3>

        <ImageGallery images={images} />

        <h2 className='text-xl font-semibold mt-6 text-gray-500'>¿Qué funciones tenemos para los adultos mayores?</h2>
        <ul className='text-lg font-normal text-gray-500'>
          <li>Cambio de tamaño de letra</li>
          <li>Agrandar mensajes específicos</li>
          <li>Poder escuchar mensajes de texto en caso de no poder leerlos</li>
          <li>Transformar audio a texto para poder enviar mensajes en caso de que sea difícil escribir en el teclado</li>
          <li>¡Y más!</li>
        </ul>

        <h3 className='text-lg font-normal text-gray-500'>¿Ya estás convencid@? ¡Únete hoy!</h3>
        <div className='flex items-center justify-center gap-6'>
          <button className='px-4 py-2.5 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none'>Iniciar sesión</button>
          <button className='px-4 py-2.5 text-lg font-semibold text-blue-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none'>Registrarse</button>
        </div>
      </main>
    </Layout>
  )
}