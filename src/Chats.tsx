import React from 'react'
import ChatRow from './components/ChatRow'
import useChats from './hooks/useChats'
import { useSelectedChatId } from './hooks/useSelectedChatId'
import { API_URL } from './services/variables'
import axios from 'axios'
import { Auth } from './services/schema'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
  const { selectedChatId } = useSelectedChatId()
  const chats = useChats()

  const createChat = async () => {
    const user = await Auth.getCurrentUser()
    if (!user || !Auth.currentAccessToken) {
      console.error('User is not authenticated')
      return
    }

    await axios.post(`${API_URL}/chats`,
      { title: 'Nuevo chat' },
      {
        headers: {
          Authorization: `Bearer ${Auth.currentAccessToken}`
        }
      }
    )
      .then(async (response) => {
        console.log('Chat creado:', response.data)
        window.location.reload()
        const chatId = response.data.id
        window.location.href = `/chats/${chatId}`
      })
      .catch((error) => {
        console.error('Error al crear chat:', error)
      })
  }

  return (
    <section
      className={`bg-gray-100 dark:bg-gray-800 rounded-md first:rounded-t-md last:rounded-b-md ${className}`}
      role='list'
    >
      <button
        className='w-full p-4 sm:p-6 font-4xl sm:font-3xl cursor-pointer rounded-md'
        onClick={createChat}
        role='listitem'
      >
        Crear chat
      </button>
      {
        chats.map((chat) => (
          <ChatRow
            chatId={chat.id}
            isSelected={chat.id === selectedChatId}
            key={chat.id}
          />
        ))
      }
    </section>
  )
}
