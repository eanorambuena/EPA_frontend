import React from 'react'
import ChatRow from './components/ChatRow'
import { Orm } from './services/orm'
import useLocalStorage from './hooks/useLocalStorage'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
  const selectedChatId = useLocalStorage('selectedChatId', 1)[0]

  return (
    <section
      className={`bg-gray-100 dark:bg-gray-800 rounded-md first:rounded-t-md last:rounded-b-md ${className}`}
      role='list'
    >
      {
        Orm.Chats.all().map((chat) => (
          <ChatRow
            chat={chat}
            isSelected={chat.id === selectedChatId}
            key={chat.id}
          />
        ))
      }
    </section>
  )
}
