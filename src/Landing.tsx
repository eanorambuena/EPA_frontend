import React from 'react'
import Layout from './Layout'

export default function Landing() {
  // Idea para un componente dinámico --> cambiar entre diversas imágenes de ejemplo
  const images = [
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=13',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=16',
    'https://i.pravatar.cc/150?img=17',
    'https://i.pravatar.cc/150?img=18',
    'https://i.pravatar.cc/150?img=19',
    'https://i.pravatar.cc/150?img=20'
  ]

  return (
    <Layout limitHeight={false}>
      <main className='w-full h-full flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-50'>
        <h2 className='text-2xl font-bold text-gray-500'>Bienvenido a EPA Chat</h2>
        <h3 className='text-lg font-normal text-gray-500'>¡La app de chat dirigida para adultos mayores!</h3>

        <div className='flex items-center justify-center gap-6'>
          <img className='w-64 h-64 rounded-full' src={images[0]} alt='Foto app 1' />
          <img className='w-64 h-64 rounded-full' src={images[1]} alt='Foto app 2' />
          <img className='w-64 h-64 rounded-full' src={images[2]} alt='Foto app 3' />
        </div>

        <h2 className='text-xl font-semibold mt-6 text-gray-500'>¿Qué funciones tenemos para los adultos mayores?</h2>
        <ul className='text-lg font-normal text-gray-500'>
          <li>Cambio de tamaño de letra</li>
          <li>Agrandar mensajes específicos</li>
          <li>Poder escuchar mensajes de texto en caso de no poder leerlos</li>
          <li>Transformar audio a texto para poder enviar mensajes en caso de que sea dificil escribir en el teclaro</li>
          <li>Y ¡más!</li>
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
