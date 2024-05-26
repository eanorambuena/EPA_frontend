import React from 'react';
import Chat from './Chat';
import Chats from './Chats';
import Login from './Login';
import Logo from './icons/Logo';
import ImageGallery from './components/ImageGallery';

export default function Landing() {
  const imagesDesktop = [
    'src/assets/ChatsDesktop.jpg',
    'src/assets/ChatDesktop.jpg',
    'src/assets/LoginDesktop.jpg'
  ];
  const imagesMobile = [
    'src/assets/ChatsMobile.jpg',
    'src/assets/ChatMobile.jpg',
    'src/assets/LoginMobile.jpg'
  ];
  const imagesTablet = [
    'src/assets/ChatsTablet.jpg',
    'src/assets/ChatTablet.jpg',
    'src/assets/LoginTablet.jpg'
  ];

  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-[150px] sm:h-[100px]'>
        <h1 className='text-2xl font-bold'>EPA Chat</h1>
        <Logo />
      </header>
      <main className='flex flex-col items-center justify-center relative max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-100px)] min-h-[calc(100dvh-150px)] sm:min-h-[calc(100dvh-100px)] p-6 bg-gray-100 dark:bg-gray-50'>
        <h2 className='text-2xl font-bold text-gray-500'>Bienvenido a EPA Chat</h2>
        <h3 className='text-lg font-normal text-gray-500'>¡La app de chat dirigida para adultos mayores!</h3>

        <ImageGallery images={imagesDesktop} />

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
    </>
  );
}