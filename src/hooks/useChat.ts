import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { ChatSchema, MessageSchema } from '../services/schema'
import { useToast, ToastType } from './useToast'
import axios from 'axios'
import { ApplicationError, ItemNotFoundError } from '../services/errors'
import { API_URL } from '../services/variables'
import { useCurrentUser } from './useCurrentUser'

export default function useChat() {
  const selectedChatId = useLocalStorage('selectedChatId', 1)[0]
  const { accessToken } = useCurrentUser()
  const toast = useToast()
  const navigate = useNavigate()
  const [chat, setChat] = useState<ChatSchema | null>(null)
  const [messages, setMessages] = useState<MessageSchema[]>([])

  const appendMessage = async (message: MessageSchema) => {
    setMessages(messages => [...messages, message])
    const response =  await axios.post(`${API_URL}/messages`, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (response.status !== 201) {
      toast('Error al enviar el mensaje', ToastType.error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const chatResponse = await axios.get(`${API_URL}/chats/${selectedChatId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if (chatResponse.status !== 200) {
          throw new ItemNotFoundError('Error al obtener el chat')
        }
        setChat(chatResponse.data)
        const messagesResponse = await axios.get(`${API_URL}/chats/${selectedChatId}/messages`)
        if (messagesResponse.status !== 200) {
          throw new ItemNotFoundError('Error al obtener los mensajes')
        }
        setMessages(messagesResponse.data)
      }
      catch (error) {
        navigate('/')
        if (error instanceof ApplicationError) {
          toast(error.message, ToastType.error)
          return
        }
        toast('Ha ocurrido un error desconocido', ToastType.error)
      }
    })()
  }, [accessToken, navigate, selectedChatId, toast])

  return { chat, messages, appendMessage }
}
