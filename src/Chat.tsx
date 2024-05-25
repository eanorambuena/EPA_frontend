import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import { Orm } from './services/orm'
import { Auth, ChatSchema, MessageSchema } from './services/schema'
import { useParams } from 'react-router-dom'
import SubmitButton from './components/SubmitButton'
import useChatInfo from './hooks/useChatInfo'
import useUpdate from './hooks/useUpdate'

interface Props {
  className?: string
  selectedChatId?: number
}

export default function Chat({ className, selectedChatId }: Props) {
  const [chat, setChat] = useState<ChatSchema>(Orm.Chats.find(selectedChatId || 1))
  if (!selectedChatId) {
    const { id } = useParams<{ id: string }>() as { id: string }
    setChat(Orm.Chats.find(parseInt(id)))
  }

  const getMessages = () => Orm.Messages.all().filter((message) => message.chat.id === selectedChatId)

  const [messages, setMessages] = useState<MessageSchema[]>(getMessages())
  const [requiresUpdate, updateChat] = useUpdate()
  const { title, imgSrc } = useChatInfo(chat)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollChatToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }
  scrollChatToBottom()

  useEffect(() => {
    if (selectedChatId)
      setChat(Orm.Chats.find(selectedChatId))
    setMessages(getMessages())
    scrollChatToBottom()
  }, [requiresUpdate, selectedChatId])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const form = document.querySelector('form') as HTMLFormElement
    const formData = new FormData(form)
    const text = formData.get('text') as string
    if (text) {
      Orm.Messages.create({
        id: Orm.Messages.all().length + 1,
        chat: chat,
        message: text,
        user: Auth.getCurrentUser(),
        createdAt: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      })
      form.reset();
      (updateChat as () => void)()
    }
  }
  
  return (
    <div className={`h-full flex flex-col items-start justify-start rounded-sm ${className}`}>
      <header className='flex items-center justify-start w-full gap-6 p-6 bg-gray-50 dark:bg-gray-700 h-fit'>
        <img className='size-10 rounded-full' src={imgSrc} alt={title} />
        <h1 className='text-md md:text-xl font-bold'>{title}</h1>
      </header>
      <main className='h-full flex flex-col w-full gap-6 flex-reverse overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-amber-100 dark:bg-gray-800'>
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
