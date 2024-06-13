import React from 'react'
import Navbar from './/Navbar/navbar'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Header() {
  const accessToken = useLocalStorage('accessToken', '')[0]

  return (
    <header className='flex items-center justify-start gap-4 p-6 bg-gray-50 dark:bg-gray-950 h-fit max-w-full'>
      <Navbar />
      {accessToken}
    </header>
  )
}
