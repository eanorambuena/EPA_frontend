import { Orm } from '../services/orm'
import { Auth, ChatSchema } from '../services/schema'

export default function useChatInfo(currentChat: ChatSchema) {
  let title = currentChat.title
  let imgSrc = currentChat.imgSrc
  if (!currentChat.isGroup) {
    const chatMembers = Orm.ChatMembers.all().filter((chatMember) => chatMember.chat.id === currentChat.id)
    const otherChatMember = chatMembers.find((chatMember) => chatMember.user !== Auth.getCurrentUser())
    if (otherChatMember) {
      title = otherChatMember.user.name
      imgSrc = otherChatMember.user.imgSrc
    }
  }

  return {
    title,
    imgSrc
  }
}
