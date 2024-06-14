import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatSchema, MessageSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useAuthentication from './useAuthentication'
import useSafeRequest from './useSafeRequest'
import { useSelectedChatId } from './useSelectedChatId'

export default function useChat() {
  const authentication = useAuthentication()
  const navigate = useNavigate()
  const safelyRequest = useSafeRequest()
  const { selectedChatId } = useSelectedChatId()
  const [chat, setChat] = useState<ChatSchema | null>(null)
  const [messages, setMessages] = useState<MessageSchema[]>([])

  const appendMessage = async (message: MessageSchema) => {
    setMessages(messages => [...messages, message])
    const response =  await safelyRequest(async () => await axios.post(`${API_URL}/messages`, message, authentication))
    if (!response) {
      return
    }
  }

  useEffect(() => {
    if (!selectedChatId || selectedChatId === -1) {
      return
    }
    (async () => {
      const chatResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${selectedChatId}`, authentication))
      if (!chatResponse) {
        return
      }
      setChat(chatResponse.data)
      const messagesResponse = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${selectedChatId}/messages`, authentication))
      if (!messagesResponse) {
        return
      }
      setMessages(messagesResponse.data)
    })()
  }, [authentication, navigate, safelyRequest, selectedChatId])

  return { chat, messages, appendMessage }
}
