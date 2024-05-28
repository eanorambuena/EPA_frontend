import React from 'react'
import Logo from './icons/Logo'
import ImageGallery from './components/ImageGallery'

export default function About() {
  const members = [
    {src: '/assets/members/EmmanuelNorambuena.jpg',
      title: 'Emmanuel Norambuena',
      description: 'Estudiante de Ingeniería Civil en Computación\nAmante de el Open Source, la sustentabilidad y la creación de comunidades, siempre anda buscando maneras de hacer las comunidades mejores.'},
    {src: '/assets/members/PabloLeiva.jpeg',
      title: 'Pablo Leiva',
      description: 'Estudiante de Ingeniería Civil en Computación\nInteresado en el machine learning, análisis de datos y Big Data, tiene como objetivo utilizar sus conocimientos para crear herramientas útiles para la sociedad.'},
    {src: '/assets/members/AlejandroHeld.jpg',
      title: 'Alejandro Held',
      description: 'Estudiante de Ingeniería Civil en Computación\nApasionado en la creación de los videojuegos y la accebilidad, junto a la creación de comunidades, intenta hacer sus programas más accesibles y divertidos para sus usuarios.'
    }
  ]

  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-[150px] sm:h-[100px]'>
        <h1 className='text-2xl font-bold'>EPA Chat</h1>
        <Logo />
      </header>
      <main className='flex flex-col items-center justify-center relative p-6 bg-gray-100 dark:bg-gray-50 text-center'>
        <h1 className='text-2xl font-bold text-gray-500'>Sobre nosotros</h1>

        <p className='font-normal text-gray-500'>Somos un grupo de estudiantes de la Universidad Católica de Chile que estamos desarrollando una aplicación de chat para adultos mayores.</p>
        <p className='font-normal text-gray-500 my-2'>Esta aplicación tiene como objetivo ser amigable y fácil de usar para personas de la tercera edad.</p>
        <p className='font-normal text-gray-500 my-2'>Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.</p>

        <h2 className='text-2xl font-bold text-gray-500 my-4'>Nuestro equipo</h2>
        
        <div className='max-w-[400px]'>
          <ImageGallery images={members} />
        </div>

      </main>
    </>
  )
}