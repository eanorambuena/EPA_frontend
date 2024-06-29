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

export default function useChat(chatId?: number, setLastMessage?: (message: MessageSchema) => void){
  const authentication = useAuthentication()
  const safelyRequest = useSafeRequest()
  const { user } = useCurrentUser()
  const [chat, setChat] = useState<ChatSchema | null>(null)
  const [messages, setMessages] = useState<MessageSchema[]>([])
  const [image, setImage] = useState<string | null>(null)

  const appendMessage = useCallback(async (message: MessageSchema) => {
    const response =  await safelyRequest(async () => await axios.post(`${API_URL}/messages`, message, authentication), [message])
    if (!response) {
      return
    }
    socket.emit('add_message', message)
  }, [safelyRequest, authentication])

  const updateMessages = useCallback(async () => {
    const messagesResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}/messages`, authentication), [chatId])
    if (!messagesResponse || JSON.stringify(messagesResponse.data) == JSON.stringify(messages)) {
      return
    }
    setMessages(messagesResponse.data)
  }, [safelyRequest, chatId, messages, authentication])

  const addSocketListeners = useCallback(() => {
    socket.on('new_message', (message: MessageSchema) => {
      console.log('New message', message)
      if (message.chatId !== chatId) {
        return
      }
      console.log('Appending message')
      setMessages(messages => [...messages, message])
      updateMessages()
      if (setLastMessage) {
        setLastMessage(message)
      }
    })
    return () => {
      socket.off('new_message')
    }
  }, [chatId, setLastMessage, updateMessages])

  useEffect(addSocketListeners, [addSocketListeners])

  const asyncSetStates = useCallback(async () => {
    if (!chatId || chatId < 0 || !user) {
      return
    }
    const chatResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${chatId}`, authentication), [chatId])
    if (!chatResponse) {
      return
    }
    setChat(chatResponse.data)
    await updateMessages()
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
  }, [chatId, user, safelyRequest, updateMessages, authentication])

  useEffect(() => {
    asyncSetStates()
  }, [authentication, safelyRequest, chatId, user, asyncSetStates, updateMessages])

  return { chat, messages, appendMessage, image: image ?? FALLBACK_IMAGE } as ChatInfo
}
