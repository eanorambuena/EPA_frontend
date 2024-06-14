import axios from 'axios'
import { ApplicationError, AuthenticationError, AuthorizationError } from './errors'
import { API_URL } from './variables'

export enum Status {
  online = 'en línea',
  offline = 'desconectado'
}

export type PhoneNumber = `+${string}`

export enum UserType {
  admin = 'admin',
  user = 'user'
}

export enum ChatMemberType {
  owner = 'owner',
  member = 'member'
}

export enum MessageState {
  sent = 'sent',
  received = 'received',
  read = 'read'
}

export type UserSchema = {
  id?: number
  phoneNumber: PhoneNumber
  password?: string
  type: UserType
}

export type ChatSchema = {
  id?: number
  title: string
}

export type MessageSchema = {
  id?: number
  userId: number
  chatId: number
  state: MessageState
  content: string
  date: string
}

export type ChatMemberSchema = {
  id?: number
  userId: number
  chatId: number
  role: ChatMemberType
}

export class Auth {
  static currentAccessToken: string | null = null

  static assertStatusCode(status: number = 500) {
    if (status === 401) {
      throw new AuthenticationError('Usuario o contraseña incorrectos')
    }
    else if (status === 403) {
      throw new AuthorizationError('No tienes permiso para acceder a este recurso')
    }
    else if (status >= 400) {
      throw new ApplicationError('Error de autenticación')
    }
  }

  static async getCurrentUser(): Promise<UserSchema | null>{
    let user: UserSchema | null = null
    if (!this.currentAccessToken) {
      this.currentAccessToken = localStorage.getItem('accessToken')?.replace(/"/g, '') || null
    }
    if (!this.currentAccessToken) {
      return user
    }
    await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${this.currentAccessToken}`
      }
    })
      .then((response) => {
        this.assertStatusCode(response.status)
        user = response.data
      })
      .catch((error) => {
        this.assertStatusCode(error.response?.status)
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
        this.assertStatusCode(response.status)
        this.currentAccessToken = response.data.access_token
      })
      .catch((error) => {
        this.assertStatusCode(error.response?.status)
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
        this.assertStatusCode(response.status)
        await Auth.login(phoneNumber, password)
      })
      .catch((error) => {
        this.assertStatusCode(error.response?.status)
      })
    return this.currentAccessToken
  }

  static logout() {
    this.currentAccessToken = null
  }
}
