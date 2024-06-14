import axios from 'axios'
import { useEffect, useState } from 'react'
import { ApplicationError, AuthenticationError, AuthorizationError, ItemNotFoundError } from '../services/errors'
import { ChatSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import { useCurrentUser } from './useCurrentUser'
import { ToastType, useToast } from './useToast'

export default function useChats() {
  const { user, accessToken } = useCurrentUser()
  const toast = useToast()
  const [chats, setChats] = useState<ChatSchema[]>([])

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          throw new AuthenticationError('Debes iniciar sesión para ver tus chats')
        }
        const response = await axios.get(`${API_URL}/chats`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        if (response.status === 401) {
          throw new AuthenticationError('Debes iniciar sesión para ver tus chats')
        }
        else if (response.status === 403) {
          throw new AuthorizationError('No tienes permiso para ver los chats')
        }
        else if (response.status === 404) {
          throw new ItemNotFoundError('No se encontraron chats')
        }
        else if (response.status !== 200) {
          throw new ApplicationError('Error al obtener los chats')
        }
        setChats(response.data)
      }
      catch (error) {
        if (error instanceof ApplicationError) {
          toast(error.message, ToastType.error)
          return
        }
        toast('Ha ocurrido un error desconocido', ToastType.error)
        console.error(error)
      }
    })()
  }, [accessToken, toast, user])

  return chats
}
