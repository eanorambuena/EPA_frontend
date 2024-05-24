import { createModel, Orm } from "./orm"

export type UserSchema = {
  id: number
  username: string
  name: string
  imgSrc: string
}
createModel<UserSchema>('Users')

export type ChatSchema = {
  id: number
  isGroup: boolean
  imgSrc: string
  title: string
}
createModel<ChatSchema>('Chats')

export type MessageSchema = {
  id: number
  user: UserSchema,
  chat: ChatSchema,
  message: string
  hourAndMinutes: string
}
createModel<MessageSchema>('Messages')

export type ChatMemberSchema = {
  id: number
  chat: ChatSchema
  user: UserSchema
  isAdmin: boolean
}
createModel<ChatMemberSchema>('ChatMembers')

export class Auth {
  static getCurrentUser() {
    return Orm.Users.findByAttribute('username', 'yo')
  }
}
