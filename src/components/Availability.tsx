import React, { useEffect, useState } from 'react'
import { Auth, ChatSchema, Status } from '../services/schema'
import { Orm } from '../services/orm'

interface Props {
  chat: ChatSchema
}

const colors = {
  [Status.online]: 'rgb(34, 197, 94)',
  [Status.offline]: 'rgb(239 68 68)'
}

export default function Availability({ chat } : Props) {
  const [otherUser, setOtherUser] = useState(Auth.getCurrentUser())

  useEffect(() => {
    if (chat.isGroup)
      return
    const chatMembers = Orm.ChatMembers.all().filter((chatMember) => chatMember.chat.id === chat.id)
    const otherChatMember = chatMembers.find((chatMember) => chatMember.user !== Auth.getCurrentUser())
    if (otherChatMember) {
      setOtherUser(otherChatMember.user)
    }
  }, [chat])

  if (chat.isGroup) return null

  return (
    <div className='flex items-center space-x-1'>
      <span
        aria-label={`El usuario ${otherUser.name} está ${otherUser.status}`}
        className='size-2 me-1 rounded-full'
        style={{ backgroundColor: colors[otherUser.status] }}
      >
      </span>
      <span
        className='text-xs text-gray-500 dark:text-gray-400'
        style={{ color: colors[otherUser.status] }}
      >
        {otherUser.status}
      </span>
    </div>
  )
}
