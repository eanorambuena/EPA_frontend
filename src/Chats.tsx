import React from 'react'
import ChatRow from './components/ChatRow'
import useChats from './hooks/useChats'
import { useSelectedChatId } from './hooks/useSelectedChatId'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
  const selectedChatId = useSelectedChatId()[0]
  const chats = useChats()

  return (
    <section
      className={`bg-gray-100 dark:bg-gray-800 rounded-md first:rounded-t-md last:rounded-b-md ${className}`}
      role='list'
    >
      {
        chats.map((chat) => (
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
