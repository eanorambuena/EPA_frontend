import React from 'react'
import ChatBubble from './ChatBubble'
import { Orm } from './services/orm'

interface Props {
  className?: string
}

export default function Chat({ className }: Props) {
  return (
    <section className={`flex flex-col gap-6 flex-reverse overflow-y-auto p-4 sm:p-6 bg-amber-100 ${className}`}>
      {
        Orm.Messages.all().map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
          />
        ))
      }
    </section>
  )
}
