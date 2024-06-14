import React from 'react'

interface Props {
  message: string
  className?: string
}

export default function Toast({ message, className = '' }: Props) {
  console.log('Toast', message)
  return (
    <div className={`fixed bottom-4 right-4 bg-gray-50 dark:bg-gray-950 p-4 rounded-md shadow-md ${className}`}>
      {message}
    </div>
  )
}
