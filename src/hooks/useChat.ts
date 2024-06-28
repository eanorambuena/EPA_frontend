import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { ChatMemberSchema, ChatSchema, MessageSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useAuthentication from './useAuthentication'
import { useCurrentUser } from './useCurrentUser'
import useSafeRequest from './useSafeRequest'

export type ChatInfo = {
  chat: ChatSchema | null
  messages: MessageSchema[]
  appendMessage: (message: MessageSchema) => void
  image: string
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/150'

const socket = io(API_URL)

socket.on('connect', () => {
  console.log('Connected to server')
})

export default function useChat(chatId?: number) {
  const authentication = useAuthentication()
  const safelyRequest = useSafeRequest()
  const { user } = useCurrentUser()
  const [chat, setChat] = useState<ChatSchema | null>(null)
  const [messages, setMessages] = useState<MessageSchema[]>([])
  const [image, setImage] = useState<string | null>(null)

  const appendMessage = useCallback(async (message: MessageSchema) => {
    setMessages(messages => [...messages, message])
    const response =  await safelyRequest(async () => await axios.post(`${API_URL}/messages`, message, authentication), [Math.random()])
    if (!response) {
      return
    }
    socket.emit('add_message', message)
  }, [safelyRequest, authentication])

  const asyncSetStates = useCallback(async () => {
    if (!chatId || chatId < 0 || !user) {
      return
    }
    const chatResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}`, authentication), [chatId])
    if (!chatResponse) {
      return
    }
    setChat(chatResponse.data)
    const messagesResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}/messages`, authentication), [chatId])
    if (!messagesResponse) {
      return
    }
    setMessages(messagesResponse.data)
    const chatMembersResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}/members`, authentication), [chatId])
    if (!chatMembersResponse) {
      return
    }
    if (chatMembersResponse.data.length > 2) {
      setImage(chatResponse.data.image)
      return
    }
    const otherChatMember = chatMembersResponse.data.find(
      (member: ChatMemberSchema) => member.userId !== user.id)
    if (!otherChatMember) {
      return
    }
    const otherChatMemberResponse = await safelyRequest(async () => await axios.get(`${API_URL}/profiles/${otherChatMember.userId}`, authentication), [otherChatMember])
    if (!otherChatMemberResponse) {
      return
    }
    setImage(otherChatMemberResponse.data.image)
  }, [authentication, safelyRequest, chatId, user])

  useEffect(() => {
    asyncSetStates()
  }, [authentication, safelyRequest, chatId, user, asyncSetStates])

  return { chat, messages, appendMessage, image: image ?? FALLBACK_IMAGE } as ChatInfo
}
