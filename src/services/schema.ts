import axios from 'axios'
import { createModel } from './orm'

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
  static currentAccessToken: string | null = null

  static async getCurrentUser() {
    let user
    if (!this.currentAccessToken) {
      this.currentAccessToken = localStorage.getItem('accessToken')?.replace(/"/g, '') || null
    }
    if (!this.currentAccessToken) {
      return
    }
    await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${this.currentAccessToken}`
      }
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(response.data.error)
        }
        user = response.data
      })
      .catch((error) => {
        console.error(error)
      })
    return user
  }

  static async login(phoneNumber: string, password: string) {
    if (!phoneNumber || !password) {
      return
    }
    await axios.post(`${API_URL}/login`, {
      phoneNumber,
      password
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(response.data.error)
        }
        this.currentAccessToken = response.data.access_token
      })
    return this.currentAccessToken
  }

  static async signUp(phoneNumber: string, password: string) {
    if (!phoneNumber || !password) {
      return
    }
    await axios.post(`${API_URL}/signup`, {
      phoneNumber,
      password
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error(response.data.error)
        }
        await Auth.login(phoneNumber, password)
      })
    return this.currentAccessToken
  }

  static logout() {
    this.currentAccessToken = null
  }
}
