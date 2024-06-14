import { useEffect, useState } from 'react'
import { ChatSchema } from '../services/schema'
import axios from 'axios'
import { API_URL } from '../services/variables'
import useCurrentUserOnePerContext from './useCurrentUserOncePerContext'
import { ApplicationError, AuthenticationError } from '../services/errors'
import { ToastType, useToast } from './useToast'

export default function useChats() {
  const user = useCurrentUserOnePerContext()[0]
  const toast = useToast()
  const [chats, setChats] = useState<ChatSchema[]>([])

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          throw new AuthenticationError('Debes iniciar sesión para ver tus chats')
        }
        const response = await axios.get(`${API_URL}/users/${user.id}/chats`)
        if (response.status !== 200) {
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
      }
    })()
  }, [toast, user])

  return chats
}
