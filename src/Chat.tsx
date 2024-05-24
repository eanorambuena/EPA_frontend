import React from 'react'
import ChatBubble from './ChatBubble'
import { Orm } from './services/orm'
import { Auth, ChatSchema } from './services/schema'
import { useParams } from 'react-router-dom'

interface Props {
  className?: string
  chat?: ChatSchema
}

export default function Chat({ className, chat }: Props) {
  let currentChat;
  if (!chat) {
    const { chatId } = useParams<{ chatId: string }>() as { chatId: string }
    currentChat = Orm.Chats.find(parseInt(chatId))
  }
  else {
    currentChat = chat
  }
  const messages = Orm.Messages.all().filter((message) => message.chat.id === currentChat.id)
  let title = currentChat.title
  let imgSrc = currentChat.imgSrc
  if (!currentChat.isGroup) {
    const chatMembers = Orm.ChatMembers.all().filter((chatMember) => chatMember.chat.id === currentChat.id)
    const otherChatMember = chatMembers.find((chatMember) => chatMember.user !== Auth.getCurrentUser())
    if (otherChatMember) {
      title = otherChatMember.user.name
      imgSrc = otherChatMember.user.imgSrc
    }
  }
  
  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full gap-6 p-6 bg-gray-50 dark:bg-gray-700 h-[150px] sm:h-[100px]'>
        <img className='w-16 h-16 rounded-full' src={imgSrc} alt={title} />
        <h1 className='text-2xl font-bold'>{title}</h1>
      </header>
      <section className='flex flex-col w-full gap-6 flex-reverse overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-amber-100 dark:bg-gray-800'>
        {
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
            />
          ))
        }
      </section>
    </div>
  )
}
