import React from 'react'
import Logo from './icons/Logo'
import Navbar from './components/Navbar/navbar'

interface Props {
  children: React.ReactNode
  limitHeight?: boolean
}

export default function Layout({ children, limitHeight = true }: Props) {
  return (
    <div className='h-[100dvh] w-full'>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950 h-fit'>
        <h1 className='text-xl font-bold'>EPA Chat</h1>
        <Logo size='30'/>
        <Navbar />
      </header>
      
      <main className={`${limitHeight ? 'h-[80%]' : 'h-fit'}  flex flex-col items-center justify-center relative p-6 bg-gray-100 dark:bg-gray-900`}>
        {children}
      </main>
    </div>
  )
}
