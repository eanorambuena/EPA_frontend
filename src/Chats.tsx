import React from 'react'
import ChatRow from './ChatRow'
import { Orm } from './services/orm'
import useLocalStorage from './hooks/useLocalStorage'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
  const selectedChatId = useLocalStorage('selectedChatId', 1)[0]

  return (
    <section
      role='list'
      className={`bg-gray-100 dark:bg-gray-800 rounded-md first:rounded-t-md last:rounded-b-md ${className}`}
    >
      {
        Orm.Chats.all().map((chat) => (
          <ChatRow
            key={chat.id}
            chat={chat}
            isSelected={chat.id === selectedChatId}
          />
        ))
      }
    </section>
  )
}
