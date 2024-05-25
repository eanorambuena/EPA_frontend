import React, { useState } from 'react'
import Chats from './Chats'
import Chat from './Chat'
import Layout from './Layout'
import { Orm } from './services/orm'

export default function Main() {
  const [selectedChatId, setSelectedChatId] = useState(Orm.Chats.first()?.id)

  return (
    <Layout>
      <div className='w-full h-full flex md:flex-row items-start mjustify-center p-6 md:p-0 md:gap-6'>
        <Chats selectedChatId={selectedChatId} selectChat={setSelectedChatId} className='w-full md:w-1/2' />
        <Chat selectedChatId={selectedChatId} className='invisible xl:visible w-1/2' />
      </div>
    </Layout>
  )
}
