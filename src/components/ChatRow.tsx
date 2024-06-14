import React, { useCallback, useEffect, useState } from 'react'
import { ChatSchema, MessageSchema } from '../services/schema'
import Availability from './Availability'
import { useNavigate } from 'react-router-dom'
import useChat from '../hooks/useChat'

interface Props {
  chat: ChatSchema
  isSelected: boolean
}

export default function ChatRow({ chat, isSelected } : Props) {
  const { title, imgSrc } = { title: chat.title, imgSrc: ''}
  const messages = useChat().messages
  const navigate = useNavigate()
  const [lastMessage, setLastMessage] = useState<MessageSchema | null>(null)

  const handleClick = useCallback(() => {
    navigate(`/chats/${chat.id}`)
  }, [chat.id, navigate])

  useEffect(() => {
    console.log({messages})
    if (messages.length === 0) return
    const lastMessage = messages.reduce(
      (prev, current) => (prev.date > current.date) ? prev : current, messages[0])
    setLastMessage(lastMessage)
  }, [messages])

  const selectedStyles = isSelected ? 'lg:bg-gray-200 lg:dark:bg-gray-700 lg:shadow-sm' : ''

  return (
    <button
      className={`w-full p-4 sm:p-6 font-4xl sm:font-3xl cursor-pointer rounded-md ${selectedStyles}`}
      onClick={handleClick}
      role='listitem'
    >
      <article className='flex items-center space-x-3 rtl:space-x-reverse'>
        <section className='flex-shrink-0'>
          <img
            alt={title}
            className='size-8 rounded-full'
            src={imgSrc}
          />
        </section>
        <section className='flex-1 min-w-0 items-start text-left rtl:text-right'>
          <header className='flex flex-row justify-between'>
            <div className='flex flex-row items-center space-x-2'>
              <p className='font-semibold text-gray-900 truncate dark:text-white'>
                {title}
              </p>
              <Availability chat={chat} />
            </div>
            <p className='text-gray-500 truncate dark:text-gray-400'>
              {lastMessage?.date}
            </p>
          </header>
          <main className='text-gray-500 truncate dark:text-gray-400'>
            {lastMessage?.content}
          </main>
        </section>
      </article>
    </button>
  )
}
