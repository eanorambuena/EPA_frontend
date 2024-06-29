import React, { useCallback, useEffect, useRef } from 'react'
import useChat from '../hooks/useChat'
import ChatBubble from './ChatBubble'

interface Props {
  chatId: number
}

export default function Messages({ chatId }: Props) {
  const { messages } = useChat(chatId)
  const $messagesContainer = useRef<HTMLElement>(null)

  const scrollChatToBottom = useCallback((delay = 100) => {
    const autoScroll = () => {
      if (!$messagesContainer.current) return
      const $lastMessage = $messagesContainer.current.lastElementChild
      if (!$lastMessage) return
      $lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    }
    setTimeout(autoScroll, delay)
  }, [])
  useEffect(scrollChatToBottom)

  useEffect(() => {
    console.log('Messages changed', messages)
    scrollChatToBottom()
  }, [messages, scrollChatToBottom])

  return (
    <main
      className='h-full flex flex-col w-full gap-6 flex-reverse overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-amber-100 dark:bg-gray-800'
      ref={$messagesContainer}
    >
      {
        messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message}
          />
        ))
      }
    </main>
  )
}
