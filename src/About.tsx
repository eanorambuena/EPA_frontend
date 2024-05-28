import React from 'react'
import Logo from './icons/Logo'

import ImageGallery from './components/ImageGallery'

export default function About() {
  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-[150px] sm:h-[100px]'>
        <h1 className='text-2xl font-bold'>EPA Chat</h1>
        <Logo />
      </header>
      <main className='flex flex-col items-center justify-center relative max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-100px)] min-h-[calc(100dvh-150px)] sm:min-h-[calc(100dvh-100px)] p-6 bg-gray-100 dark:bg-gray-50 text-center'>
        <h1 className='text-2xl font-bold text-gray-500'>Sobre nosotros</h1>

        <p className='font-normal text-gray-500'>Somos un grupo de estudiantes de la Universidad Católica de Chile que estamos desarrollando una aplicación de chat para adultos mayores.</p>
        <p className='font-normal text-gray-500 my-2'>Esta aplicación tiene como objetivo ser amigable y fácil de usar para personas de la tercera edad.</p>
        <p className='font-normal text-gray-500 my-2'>Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.</p>

        <h2 className='text-2xl font-bold text-gray-500 my-4'>Nuestro equipo</h2>

        <h3 className='text-lg font-normal text-gray-500'>Emmanuel Norambuena</h3>
        <p className='font-normal text-gray-500'>Estudiante de Ingeniería Civil en Computación</p>
        <p className='font-normal text-gray-500 my-2'>Amante de el Open Source, la sustentabilidad y la creación de comunidades, siempre anda buscando maneras de hacer las comunidades mejores.</p>
                
        <h3 className='text-lg font-normal text-gray-500 my-4'>Pablo Leiva</h3>
        <p className='font-normal text-gray-500 my-2'>Estudiante de Ingeniería Civil en Computación</p>

        <h3 className='text-lg font-normal text-gray-500 my-4'>Alejandro Held</h3>
        <p className='font-normal text-gray-500'>Estudiante de Ingeniería Civil en Computación</p>
        <p className='font-normal text-gray-500 my-2'>Apasionado en la creación de los videojuegos y la accebilidad, junto a la creación de comunidades, intenta hacer sus programas más accesibles y divertidos para sus usuarios.</p>
      </main>
    </>
  )
}