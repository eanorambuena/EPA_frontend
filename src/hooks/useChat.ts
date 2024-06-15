import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatSchema, MessageSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useAuthentication from './useAuthentication'
import useSafeRequest from './useSafeRequest'
import { useCurrentUser } from './useCurrentUser'
import useChatMembers from './useChatMembers'

export type ChatInfo = {
  chat: ChatSchema | null
  messages: MessageSchema[]
  appendMessage: (message: MessageSchema) => void
  image: string
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/150'

export default function useChat(chatId?: number) {
  const authentication = useAuthentication()
  const chatMembers = useChatMembers()
  const navigate = useNavigate()
  const safelyRequest = useSafeRequest()
  const { user } = useCurrentUser()
  const [chat, setChat] = useState<ChatSchema | null>(null)
  const [messages, setMessages] = useState<MessageSchema[]>([])
  const [image, setImage] = useState<string | null>(null)

  const appendMessage = async (message: MessageSchema) => {
    setMessages(messages => [...messages, message])
    const response =  await safelyRequest(async () => await axios.post(`${API_URL}/messages`, message, authentication))
    if (!response) {
      return
    }
  }

  useEffect(() => {
    if (!chatId || chatId === -1) {
      return
    }
    (async () => {
      const chatResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}`, authentication))
      if (!chatResponse) {
        return
      }
      setChat(chatResponse.data)
      const messagesResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}/messages`, authentication))
      if (!messagesResponse) {
        return
      }
      setMessages(messagesResponse.data)
    })()
  }, [authentication, navigate, safelyRequest, chatId])

  useEffect(() => {
    if (!chat || !chatMembers || !user || image) {
      return
    }
    if (chatMembers.length >= 2) {
      setImage(chat.image)
      return
    }
    const chatMember = chatMembers.find(member => member.id !== user.id)
    if (!chatMember) {
      return
    }
    (async () => {
      const response = await safelyRequest(async () => await axios.get(`${API_URL}/profiles/${chatMember.id}`, authentication))
      if (!response) {
        return
      }
      setImage(response.data.image)
    })()
  }, [authentication, chat, image, chatMembers, safelyRequest, user])

  return { chat, messages, appendMessage, image: image ?? FALLBACK_IMAGE } as ChatInfo
}
