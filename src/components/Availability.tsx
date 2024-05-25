import React, { useEffect, useState } from 'react'
import { Auth, ChatSchema } from '../services/schema'
import { Orm } from '../services/orm'

interface Props {
  chat: ChatSchema
}

enum Status {
  online = 'online',
  offline = 'offline'
}

const colors = {
  online: 'rgb(34, 197, 94)',
  offline: 'rgb(239 68 68)'
}

export default function Availability({ chat } : Props) {
  const [status, setStatus] = useState<Status>(Status.offline)
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
    <span className='size-2 me-1 rounded-full' style={{ backgroundColor: colors[status] }}></span>
  )
}
