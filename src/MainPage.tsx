import React from 'react'
import Chats from './Chats'
import Chat from './Chat'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'

export default function MainPage() {
  const { id } = useParams<{ id: string }>() as { id: string }
  const [selectedChatId, setSelectedChatId] = useLocalStorage('selectedChatId', 1)
  if (id && selectedChatId !== parseInt(id)) {
    setSelectedChatId(parseInt(id))
  }
  
  return (
    <Layout className='p-0 md:p-6'>
      <div className='w-full h-full flex md:flex-row items-start justify-center p-0 md:gap-6'>
        { id ? (
          <>
            <Chats className='hidden lg:block w-1/2 shadow-md' />
            <Chat className='w-full md-[70%] lg:w-1/2 shadow-md' />
          </>
        ) : (
          <>
            <Chats className='w-full md-[70%] lg:w-1/2 shadow-md' />
            <Chat className='hidden lg:flex w-1/2 shadow-md' />
          </>
        )}
      </div>
    </Layout>
  )
}
