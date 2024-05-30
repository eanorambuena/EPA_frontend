import React from 'react'
import Header from './components/Header'
import GoBackLink from './components/GoBackLink'

interface Props {
  children: React.ReactNode
  limitHeight?: boolean
  className?: string
}

export default function Layout({ children, limitHeight = true, className = '' }: Props) {
  return (
    <div className='h-[100dvh] w-full'>
      <Header />
      <main className={`${limitHeight ? 'h-[85%] sm:h-[80%]' : 'h-fit'} flex flex-col items-center justify-center relative p-6 bg-gray-100 dark:bg-gray-900 ${className}`}>
        <div className='w-full flex justify-start'>
          <GoBackLink />
        </div>
        {children}
      </main>
    </div>
  )
}
