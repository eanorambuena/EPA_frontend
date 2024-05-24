import React from 'react'
import ChatRow from './ChatRow'
import { Orm } from './services/orm'

interface Props {
  className?: string
  selectedChatId: number
  selectChat: (id: number) => void
}

export default function Chats({ className, selectedChatId, selectChat }: Props) {
  return (
    <ul role='list' className={`w-full md:w-[70%] lg:w-[50%] divide-y divide-gray-200 dark:divide-gray-700 bg-gray-100 dark:bg-gray-800 ${className}`}>
      {
        Orm.Chats.all().map((chat) => (
          <ChatRow
            key={chat.id}
            chat={chat}
            selected={selectedChatId === chat.id}
            selectChat={selectChat}
          />
        ))
      }
    </ul>
  )
}
