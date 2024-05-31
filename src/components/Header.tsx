import React from 'react'
import Navbar from './/Navbar/navbar'

export default function Header() {
  return (
    <header className='flex items-center justify-start gap-4 p-6 bg-gray-50 dark:bg-gray-950 h-fit max-w-full'>
      <Navbar />
    </header>
  )
}
