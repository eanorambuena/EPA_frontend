import React from 'react'
import { Orm } from './services/orm'
import { ChatSchema, Auth } from './services/schema'

interface Props {
  chat: ChatSchema
}

export default function ChatRow({ chat } : Props) {
  const messages = Orm.Messages.all().filter((message) => message.chat.id === chat.id)
  if (messages.length === 0) return null
  const lastMessage = messages.reduce((prev, current) => (prev.hourAndMinutes > current.hourAndMinutes) ? prev : current, messages[0])
  const user = lastMessage.user
  let title = chat.title
  let imgSrc = chat.imgSrc
  if (!chat.isGroup) {
    const chatMembers = Orm.ChatMembers.all().filter((chatMember) => chatMember.chat.id === chat.id)
    const otherChatMember = chatMembers.find((chatMember) => chatMember.user !== Auth.getCurrentUser())
    if (otherChatMember) {
      title = otherChatMember.user.name
      imgSrc = otherChatMember.user.imgSrc
    }
  }

  return (
    <li className='p-4 sm:p-6 font-4xl'>
      <div className='flex items-center space-x-3 rtl:space-x-reverse'>
        <div className='flex-shrink-0'>
          <img className='w-8 h-8 rounded-full' src={imgSrc} alt={title} />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex flex-row justify-between'>
            <p className='font-semibold text-gray-900 truncate dark:text-white'>
              {title}
            </p>
            <p className='text-gray-500 truncate dark:text-gray-400'>
              {lastMessage.hourAndMinutes}
            </p>
          </div>
          <p className='text-gray-500 truncate dark:text-gray-400'>
            {lastMessage.message}
          </p>
        </div>
        <span className='hidden sm:inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
          <span className='w-2 h-2 me-1 bg-green-500 rounded-full'></span>
          Disponible
        </span>
      </div>
    </li>
  )
}
