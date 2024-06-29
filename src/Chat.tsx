import axios from 'axios'
import React from 'react'
import Availability from './components/Availability'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'
import useChat from './hooks/useChat'
import { useSelectedChatId } from './hooks/useSelectedChatId'
import { API_URL } from './services/variables'
import useAuthentication from './hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import SubmitButton from './components/SubmitButton'

interface Props {
  className?: string
}

export default function Chat({ className }: Props) {
  const { selectedChatId } = useSelectedChatId()
  const { chat, messages, appendMessage, image } = useChat(selectedChatId)
  const authentication = useAuthentication()
  const navigate = useNavigate()

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
      const response = await axios.patch(`${API_URL}/chats/${chatId}`, { title: chatName }, authentication)
      console.log(response)
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error updating chat:', error)
    }
  }

  const handleLeaveChat = async () => {
    try {
      navigate('/chats')
      await axios.patch(`${API_URL}/chats/leave/${chat.id}`, {}, authentication)
    } catch (error) {
      console.error('Error al abandonar chat:', error)
    }
  }

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Add')
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const phoneNumber = formData.get('phoneNumber') as string
    const chatId = chat.id

    try {
      const response = await axios.post(`${API_URL}/chats/${chatId}/members`, { phoneNumber }, authentication)
      console.log(response)
      if (response.status === 201) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  return (
    <div className={`h-full flex flex-col items-start justify-start ${className}`}>
      <header className='flex items-center justify-start w-full h-fit shadow-sm gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-t-md flex-wrap'>
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
          onSubmit={handleAdd}
        >
          <label
            className='sr-only'
            htmlFor='phoneNumber'
          >
            Añadir miembro
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border border-violet-300'
            id='phoneNumber'
            name='phoneNumber'
            placeholder='+56912345678'
            required
            type='text'
          />
          <SubmitButton className='ml-2'>
            Añadir
          </SubmitButton>
        </form>
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
        <button
          className='text-red-500 dark:text-red-400'
          onClick={handleLeaveChat}
        >
          Abandonar chat
        </button>
      </header>
      <Messages messages={messages} />
      <SendMessageForm
        appendMessage={appendMessage}
        chat={chat}
      />
    </div>
  )
}