import React, { useEffect, useState } from 'react'
import { Auth, ChatMemberSchema, ChatSchema, Status } from '../services/schema'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface Props {
  chat: ChatSchema
}

const colors = {
  [Status.online]: 'rgb(34, 197, 94)',
  [Status.offline]: 'rgb(239 68 68)'
}

export default function Availability({ chat } : Props) {
  /*const user = useCurrentUser().user
  const [otherUser, setOtherUser] = useState<Auth | null>(null)

  useEffect(() => {
    if (chat.isGroup)
      return
    const chatMembers: ChatMemberSchema[] = []
    const otherChatMember = chatMembers.find((chatMember) => chatMember.userId !== user.id)
    if (otherChatMember) {
      //setOtherUser(otherChatMember.userId)
    }
  }, [chat, user])*/
  return null
  if (chat?.isGroup) return null

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
