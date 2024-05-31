import React from 'react'

interface Props {
  fill?: string
}

export default function GoBackArrow({ fill = 'currentColor' } : Props) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={fill}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
    >
      <polyline points='15 18 9 12 15 6' />
    </svg>
  )
}
