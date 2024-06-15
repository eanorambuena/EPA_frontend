import React from 'react'
import { MessageSchema } from '../services/schema'
import Dropdown from './Dropdown'
import TTS from '../services/tts'
import { getLocalDate } from '../services/date'
import { useCurrentUser } from '../hooks/useCurrentUser'
import useUserProfile from '../hooks/useUserProfile'

interface Props {
  message: MessageSchema
}

export default function ChatBubble({ message } : Props) {
  const { user } = useCurrentUser()
  const senderProfile = useUserProfile(message.userId)
  if (!senderProfile) {
    return null
  }
  const isMe = user?.id == senderProfile.userId
  const color = isMe === true ? '#c4b5fd' : '#fcd34d'

  return (
    <article className={`flex gap-2.5 items:start text-gray-900 dark:text-gray-950 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <img
        alt={senderProfile.username}
        className='w-8 h-8 rounded-full'
        src={senderProfile.image}
      />
      <button
        className={`flex flex-col w-full max-w-[320px] leading-1.5 text-left p-4 transition active:scale-125 ease-in-out duration-200 z-50 motion-reduce:transition-none motion-reduce:hover:transform-none border-gray-300 ${isMe ? 'rounded-s-xl rounded-ee-xl' : 'rounded-e-xl rounded-es-xl'}`}
        onClick={() => TTS.speak(message.content)}
        style={{backgroundColor: color}}
      >
        <header className='flex items-center justify-between w-full rtl:space-x-reverse'>
          <span className='text-sm font-semibold'>
            {isMe ? 'Tú' : senderProfile.username}
          </span>
          <span className='text-sm font-normal text-gray-500'>
            {getLocalDate(message.date)}
          </span>
        </header>
        <p className='text-sm font-normal py-2.5'>
          {message.content}
        </p>
        <span className='text-sm font-normal text-gray-500'>
          Recibido
        </span>
      </button>
      <button
        className='inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500'
        data-dropdown-placement='bottom-start'
        data-dropdown-toggle='dropdownDots'
        id='dropdownMenuIconButton'
        type='button'
      >
        <svg
          aria-hidden='true'
          className='w-4 h-4 text-gray-500 dark:text-gray-400'
          fill='currentColor'
          viewBox='0 0 4 15'
        >
          <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
        </svg>
      </button>
      <Dropdown />
    </article>
  )
}
