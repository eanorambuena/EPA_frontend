import React, { useState } from 'react'
import Chats from './Chats'
import Chat from './Chat'
import { Orm } from './services/orm'

export default function Main() {
  const [selectedChatId, setSelectedChatId] = useState(Orm.Chats.first()?.id)
  const chat = Orm.Chats.find(selectedChatId)

  const selectChat = (id: number) => {
    setSelectedChatId(id)
  }

  return (
    <div className='w-full h-full flex flex-col md:flex-row items-start justify-center md:gap-6'>
      <Chats selectedChatId={selectedChatId} selectChat={selectChat} className='w-full xl:w-1/2' />
      <Chat chat={chat} className='invisible xl:visible w-1/2' />
    </div>
  )
}
