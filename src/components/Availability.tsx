import React from 'react'
import { Status } from '../services/schema'

const colors = {
  [Status.online]: 'rgb(34, 197, 94)',
  [Status.offline]: 'rgb(239 68 68)'
}

export default function Availability() {
  return (
    <div className='flex items-center space-x-1'>
      <span
        aria-label={`El usuario ${''} está ${Status.online}`}
        className='size-2 me-1 rounded-full'
        style={{ backgroundColor: colors[Status.online] }}
      >
      </span>
      <span
        className='text-xs text-gray-500 dark:text-gray-400'
        style={{ color: colors[Status.online] }}
      >
        {Status.online}
      </span>
    </div>
  )
}
