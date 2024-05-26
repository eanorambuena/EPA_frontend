import React, { useCallback } from 'react'
import { Orm } from '../services/orm'
import { ChatSchema, MessageSchema } from '../services/schema'
import useChatInfo from '../hooks/useChatInfo'
import Availability from './Availability'
import { useNavigate } from 'react-router-dom'

interface Props {
  chat: ChatSchema
  isSelected: boolean
}

export default function ChatRow({ chat, isSelected } : Props) {
  const { title, imgSrc } = useChatInfo(chat)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/chats/${chat.id}`)
  }, [chat.id, navigate])

  const messages = Orm.Messages.all().filter((message) => message.chat.id === chat.id)
  if (messages.length === 0) return null

  const lastMessage: MessageSchema = messages.reduce((prev, current) => (prev.hourAndMinutes > current.hourAndMinutes) ? prev : current, messages[0])
  const selectedStyles = isSelected ? 'lg:bg-gray-200 lg:dark:bg-gray-700 lg:shadow-sm' : ''

  return (
    <button onClick={handleClick} className={`w-full p-4 sm:p-6 font-4xl sm:font-3xl cursor-pointer rounded-md ${selectedStyles}`}>
      <article className='flex items-center space-x-3 rtl:space-x-reverse'>
        <section className='flex-shrink-0'>
          <img className='size-8 rounded-full' src={imgSrc} alt={title} />
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
              {lastMessage.createdAt}
            </p>
          </header>
          <main className='text-gray-500 truncate dark:text-gray-400'>
            {lastMessage.message}
          </main>
        </section>
      </article>
    </button>
  )
}
