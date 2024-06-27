import React from 'react'
import Availability from './components/Availability'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import useChat from './hooks/useChat'
import { useSelectedChatId } from './hooks/useSelectedChatId'
import SubmitButton from './components/SubmitButton'

interface Props {
  className?: string
}

export default function Chat({ className  }: Props) {
  const { selectedChatId } = useSelectedChatId()
  const { chat, messages, appendMessage, image } = useChat(selectedChatId)

  if (!chat) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${className}`}>
        <p className='text-lg font-bold'>
          Selecciona un chat para comenzar
        </p>
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit')
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const chatName = formData.get('chatName') as string
    console.log(chatName)
  }

  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full h-fit shadow-sm gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-t-md'>
        <img
          alt={chat.title}
          className='size-8 sm:size-10 rounded-full'
          src={image}
        />
        <h1 className='text-sm sm:text-md md:text-lg font-bold'>
          {chat.title}
        </h1>
        <form 
          className='flex-1 flex justify-end'
          onSubmit={handleSubmit}  
        >
          <input className='rounded-md px-4 py-2 bg-inherit border border-violet-300'
          placeholder='Cambiar nombre'
          type='text'
          id='chatName'
          name='chatName'
          required
          />
          <SubmitButton className='ml-2'>
            Cambiar
          </SubmitButton>
        </form>
        <Availability />
      </header>
      <Messages messages={messages} />
      <SendMessageForm
        appendMessage={appendMessage}
        chat={chat}
      />
    </div>
  )
}
