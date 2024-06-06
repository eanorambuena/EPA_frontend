import React, { useCallback, useRef } from 'react'
import ChatBubble from './ChatBubble'
import { MessageSchema } from '../services/schema'

interface Props {
  messages: MessageSchema[]
}

export default function Messages({ messages }: Props) {
  const $messagesContainer = useRef<HTMLElement>(null)

  const scrollChatToBottom = useCallback((delay = 100) => {
    const autoScroll = () => {
      if (!$messagesContainer.current) return
      const maxScrollTop = $messagesContainer.current.scrollHeight
      $messagesContainer.current.scrollTop = (maxScrollTop > 0 ? maxScrollTop : 0)
    }
    setTimeout(autoScroll, delay)
  }, [])
  scrollChatToBottom(10)

  return (
    <main
      className='h-full flex flex-col w-full gap-6 flex-reverse overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-amber-100 dark:bg-gray-800'
      ref={$messagesContainer}
    >
      {
        messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
          />
        ))
      }
    </main>
  )
}
