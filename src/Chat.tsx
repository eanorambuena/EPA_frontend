import axios from 'axios'
import React from 'react'
import Availability from './components/Availability'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import SubmitButton from './components/SubmitButton'
import useAuthentication from './hooks/useAuthentication'
import useChat from './hooks/useChat'
import { useSelectedChatId } from './hooks/useSelectedChatId'
import { API_URL } from './services/variables'

interface Props {
  className?: string
}

export default function Chat({ className }: Props) {
  const { selectedChatId } = useSelectedChatId()
  const { chat, appendMessage, image } = useChat(selectedChatId)
  const authenticationConfig = useAuthentication() // Move the hook call here

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
    console.log('Submit')
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const chatName = formData.get('chatName') as string
    const chatId = chat.id

    try {
      const response = await axios.patch(`${API_URL}/chats/${chatId}`, { title: chatName }, authenticationConfig)
      console.log(response)
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error updating chat:', error)
    }
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
          <label
            className='sr-only'
            htmlFor='chatName'
          >
            Cambiar nombre
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border border-violet-300'
            id='chatName'
            name='chatName'
            placeholder='Cambiar nombre'
            required
            type='text'
          />
          <SubmitButton className='ml-2'>
            Cambiar
          </SubmitButton>
        </form>
        <Availability />
      </header>
      <Messages chatId={chat.id} />
      <SendMessageForm
        appendMessage={appendMessage}
        chat={chat}
      />
    </div>
  )
}
