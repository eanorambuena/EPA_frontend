import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApplicationError, ItemNotFoundError } from '../services/errors'
import { ChatSchema, MessageSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import { useCurrentUser } from './useCurrentUser'
import { useSelectedChatId } from './useSelectedChatId'
import { ToastType, useToast } from './useToast'

export default function useChat() {
  const  {selectedChatId } = useSelectedChatId()
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
    console.log({selectedChatId})
    if (!selectedChatId || selectedChatId === -1) {
      return
    }
    (async () => {
      try {
        const chatResponse = await axios.get(`${API_URL}/chats/${selectedChatId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if (chatResponse.status !== 200) {
          console.log({chatResponse})
          throw new ApplicationError('Error al obtener el chat')
        }
        if (!chatResponse.data) {
          throw new ItemNotFoundError('Chat no encontrado')
        }
        setChat(chatResponse.data)
        const messagesResponse = await axios.get(`${API_URL}/chats/${selectedChatId}/messages`)
        if (messagesResponse.status !== 200) {
          throw new ApplicationError('Error al obtener los mensajes')
        }
        setMessages(messagesResponse.data)
      }
      catch (error) {
        navigate('/')
        if (error.response?.status === 404) {
          toast('Chat no encontrado', ToastType.error)
          return
        }
        else if (error.response?.status === 403) {
          toast('No tienes permiso para ver este chat', ToastType.error)
          return
        }
        else if (error.response?.status === 401) {
          toast('Debes iniciar sesión para ver este chat', ToastType.error)
          return
        }
        else if (error instanceof ApplicationError) {
          toast(error.message, ToastType.error)
          return
        }
        toast('Ha ocurrido un error desconocido', ToastType.error)
      }
    })()
  }, [accessToken, navigate, selectedChatId, toast])

  return { chat, messages, appendMessage }
}
