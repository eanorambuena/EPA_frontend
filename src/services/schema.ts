import axios from 'axios'
import { createModel, Orm } from './orm'

const API_URL = import.meta.env.VITE_BACKEND_URL

export enum Status {
  online = 'en línea',
  offline = 'desconectado'
}

export type UserSchema = {
  id: number
  username: string
  name: string
  imgSrc: string
  available: boolean
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
  user: UserSchema
  chat: ChatSchema
  message: string
  createdAt: string
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

  static async login(phoneNumber: string, password: string) {
    if (!phoneNumber || !password) {
      return
    }
    let accessToken
    await axios.post(`${API_URL}/login`, {
      phoneNumber,
      password
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(response.data.error)
        }
        accessToken = response.data.access_token
      })
    return accessToken
  }

  static async signUp(phoneNumber: string, password: string) {
    if (!phoneNumber || !password) {
      return
    }
    let accessToken
    await axios.post(`${API_URL}/signup`, {
      phoneNumber,
      password
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error(response.data.error)
        }
        accessToken = await Auth.login(phoneNumber, password)
      })
    return accessToken
  }
}
