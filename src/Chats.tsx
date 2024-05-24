import React from 'react'
import ChatRow from './ChatRow'
import { Orm } from './services/orm'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
 return (
    <ul role='list' className={`w-full md:w-[70%] lg:w-[50%] divide-y divide-gray-200 dark:divide-gray-700 bg-gray-100 dark:bg-gray-900 ${className}`}>
      {
        Orm.Chats.all().map((chat) => (
          <ChatRow
            key={chat.id}
            chat={chat}
          />
      ))
      }
    </ul>
 )
}
