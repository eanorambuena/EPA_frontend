import React, { useCallback, useEffect, useState } from 'react'
import { Orm } from './services/orm'
import { ChatSchema, MessageSchema } from './services/schema'
import useChatInfo from './hooks/useChatInfo'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import useLocalStorage from './hooks/useLocalStorage'
import Availability from './components/Availability'

interface Props {
  className?: string
}

export default function Chat({ className  }: Props) {
  const selectedChatId = useLocalStorage('selectedChatId', 1)[0]
  const [chat, setChat] = useState<ChatSchema>(Orm.Chats.find(selectedChatId))

  const getMessages = useCallback<() => MessageSchema[]>(
    () => Orm.Messages.all().filter((message) => message.chat.id === chat.id), [chat.id])

  const [messages, setMessages] = useState<MessageSchema[]>(getMessages())
  const { title, imgSrc } = useChatInfo(chat)

  const appendMessage = useCallback((message: MessageSchema) => {
    Orm.Messages.create(message)
    setMessages(messages => [...messages, message])
  }, [])

  useEffect(() => {
    setChat(Orm.Chats.find(selectedChatId))
    setMessages(getMessages())
  }, [getMessages, selectedChatId])
  
  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full h-fit shadow-sm gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-t-md'>
        <img className='size-8 sm:size-10 rounded-full' src={imgSrc} alt={title} />
        <h1 className='text-sm sm:text-md md:text-lg font-bold'>{title}</h1>
        <Availability chat={chat} />
      </header>
      <Messages messages={messages} />
      <SendMessageForm chat={chat} appendMessage={appendMessage} />
    </div>
  )
}
