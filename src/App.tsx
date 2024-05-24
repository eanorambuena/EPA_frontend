import React from 'react'
import Chat from './Chat'
import Chats from './Chats'
import Login from './Login'
import Logo from './icons/Logo'

export default function App() {
  const vistas = {
    0: <Chat />,
    1: <div className='w-full h-screen flex items-start justify-center gap-6 bg'>
      <Chats className='w-full xl:w-1/2 h-screen' />
      <Chat className='invisible xl:visible w-1/2 h-screen xl:flex' />
    </div>,
    2: <Login />
  }
  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-[150px] sm:h-[100px]'>
        <h1 className='text-2xl font-bold'>EPA Chat</h1>
        <Logo />
      </header>
      <main className='flex flex-col items-center justify-center relative  max-h-[100dvh-150px] sm:max-h-[100dvh-100px] min-h-[calc(100dvh-150px)] sm:min-h-[calc(100dvh-100px)] p-6 bg-gray-100 dark:bg-gray-50'>
        { vistas[1] }
      </main>
    </>
  )
}
