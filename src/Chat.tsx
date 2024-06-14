import React from 'react'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import Availability from './components/Availability'
import useChat from './hooks/useChat'

interface Props {
  className?: string
}

export default function Chat({ className  }: Props) {
  const { chat, messages, appendMessage } = useChat()
  const { title, imgSrc } = { title: '', imgSrc: '' } // useChatInfo(chat)
  if (!chat) {
    return null
  }

  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full h-fit shadow-sm gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-t-md'>
        <img
          alt={title}
          className='size-8 sm:size-10 rounded-full'
          src={imgSrc}
        />
        <h1 className='text-sm sm:text-md md:text-lg font-bold'>
          {title}
        </h1>
        <Availability chat={chat} />
      </header>
      <Messages messages={messages} />
      <SendMessageForm
        appendMessage={appendMessage}
        chat={chat}
      />
    </div>
  )
}
