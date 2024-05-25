import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import { Orm } from './services/orm'
import { Auth, ChatSchema, MessageSchema } from './services/schema'
import { useParams } from 'react-router-dom'
import SubmitButton from './components/SubmitButton'
import useChatInfo from './hooks/useChatInfo.tsx'

interface Props {
  className?: string
  chat?: ChatSchema
}

export default function Chat({ className, chat }: Props) {
  let currentChat
  if (!chat) {
    const { id } = useParams<{ id: string }>() as { id: string }
    currentChat = Orm.Chats.find(parseInt(id))
  }
  else {
    currentChat = chat
  }

  const getMessages = () => Orm.Messages.all().filter((message) => message.chat.id === currentChat.id)

  const [messages, setMessages] = useState<MessageSchema[]>(getMessages())
  const [requiresUpdate, setRequiresUpdate] = useState(true)
  const { title, imgSrc } = useChatInfo(currentChat)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollChatToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: "end" })
  }

  useEffect(() => {
    if (!requiresUpdate)
      return
    setMessages(getMessages())
    scrollChatToBottom()
    setRequiresUpdate(false)
  }, [requiresUpdate])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const form = document.querySelector('form') as HTMLFormElement
    const formData = new FormData(form)
    const text = formData.get('text') as string
    if (text) {
      Orm.Messages.create({
        id: Orm.Messages.all().length + 1,
        chat: currentChat,
        message: text,
        user: Auth.getCurrentUser(),
        createdAt: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      })
      form.reset()
      setRequiresUpdate(true)
    }
  }
  
  return (
    <div className={`h-full flex flex-col items-start justify-start rounded-sm ${className}`}>
      <header className='flex items-center justify-start w-full gap-6 p-6 bg-gray-50 dark:bg-gray-700 h-fit'>
        <img className='size-10 rounded-full' src={imgSrc} alt={title} />
        <h1 className='text-md md:text-xl font-bold'>{title}</h1>
      </header>
      <main
        className='chat-main flex flex-col w-full gap-6 flex-reverse overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-amber-100 dark:bg-gray-800'
      >
        {
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
            />
          ))
        }
        <div ref={messagesEndRef} />
      </main>
      <form
        className='flex items-center justify-between w-full gap-6 p-6 bg-gray-50 dark:bg-gray-700 h-fit'
        onSubmit={(e) => sendMessage(e)}
      >
        <label className='sr-only' htmlFor='text'>
          Mensaje
        </label>
        <input
          className='flex-grow rounded-md px-4 py-2 bg-violet-300 border border-violet-300 placeholder-gray-800 text-gray-800'
          name='text'
          type='text'
          placeholder='Escibe un mensaje...'
          required
        />
        <SubmitButton>Enviar</SubmitButton>
      </form>
    </div>
  )
}
