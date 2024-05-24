import React from 'react'
import Logo from './icons/Logo'
import Main from './Main'

export default function App() {
  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-[150px] sm:h-[100px]'>
        <h1 className='text-2xl font-bold'>EPA Chat</h1>
        <Logo />
      </header>
      <main className='h-full flex flex-col items-center justify-center relative p-6 bg-gray-100 dark:bg-gray-900'>
        <Main />
      </main>
    </>
  )
}
