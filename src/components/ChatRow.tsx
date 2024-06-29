import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useChat from '../hooks/useChat'
import { getLocalDate } from '../services/date'
import { MessageSchema } from '../services/schema'
import Availability from './Availability'
import { io } from 'socket.io-client'
import { API_URL } from '../services/variables'

interface Props {
  chatId: number
  isSelected: boolean
}

const socket = io(API_URL)

export default function ChatRow({ chatId, isSelected } : Props) {
  const [lastMessage, setLastMessage] = useState<MessageSchema | null>(null)
  const { chat, messages, image } = useChat(chatId, setLastMessage)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/chats/${chatId}`)
  }, [chatId, navigate])

  socket.on('new_message', (message: MessageSchema) => {
    if (message.chatId !== chatId) {
      return
    }
    setLastMessage(message)
  })

  useEffect(() => {
    if (messages.length === 0) return
    const getLastMessage = () => messages[messages.length - 1]
    setLastMessage(getLastMessage())
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
            alt={chat?.title}
            className='size-8 rounded-full'
            src={image}
          />
        </section>
        <section className='flex-1 min-w-0 items-start text-left rtl:text-right'>
          <header className='flex flex-row justify-between'>
            <div className='flex flex-row items-center space-x-2'>
              <p className='font-semibold text-gray-900 truncate dark:text-white'>
                {chat?.title}
              </p>
              <Availability />
            </div>
            <p className='text-gray-500 truncate dark:text-gray-400'>
              {getLocalDate(lastMessage?.date)}
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
