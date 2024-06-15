import React from 'react'
import Availability from './components/Availability'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import useChat from './hooks/useChat'
import { useSelectedChatId } from './hooks/useSelectedChatId'

interface Props {
  className?: string
}

export default function Chat({ className  }: Props) {
  const { selectedChatId } = useSelectedChatId()
  const { chat, messages, appendMessage, image } = useChat(selectedChatId)

  if (!chat) {
    return (
      <div className={`h-full flex flex-col items-start justify-start ${className}`}>
        <p className='text-lg font-bold text-gray-500 dark:text-gray-400'>
          Selecciona un chat para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full h-fit shadow-sm gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-t-md'>
        <img
          alt={chat.title}
          className='size-8 sm:size-10 rounded-full'
          src={image}
        />
        <h1 className='text-sm sm:text-md md:text-lg font-bold'>
          {chat.title}
        </h1>
        <Availability />
      </header>
      <Messages messages={messages} />
      <SendMessageForm
        appendMessage={appendMessage}
        chat={chat}
      />
    </div>
  )
}
