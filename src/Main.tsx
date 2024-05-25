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
    <div className='w-full h-full flex md:flex-row items-start mjustify-center p-6 md:p-0 md:gap-6'>
      <Chats selectedChatId={selectedChatId} selectChat={selectChat} className='w-full md:w-1/2' />
      <Chat chat={chat} className='invisible xl:visible w-1/2' />
    </div>
  )
}
