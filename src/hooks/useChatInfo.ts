import { useEffect, useState } from 'react'
import { Orm } from '../services/orm'
import { Auth, ChatSchema } from '../services/schema'

export default function useChatInfo(chat: ChatSchema) {
  const [title, setTitle] = useState(chat.title)
  const [imgSrc, setImgSrc] = useState(chat.imgSrc)

  useEffect(() => {
    if (!chat.isGroup) {
      const chatMembers = Orm.ChatMembers.all().filter((chatMember) => chatMember.chat.id === chat.id)
      const otherChatMember = chatMembers.find((chatMember) => chatMember.user !== Auth.getCurrentUser())
      if (otherChatMember) {
        setTitle(otherChatMember.user.name)
        setImgSrc(otherChatMember.user.imgSrc)
      }
      return
    }
    setTitle(chat.title)
    setImgSrc(chat.imgSrc)
  }, [chat])

  return {
    title,
    imgSrc
  }
}
