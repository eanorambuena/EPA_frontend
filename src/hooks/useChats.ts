import axios from 'axios'
import { useEffect, useState } from 'react'
import { ChatSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useAuthentication from './useAuthentication'
import useSafeRequest from './useSafeRequest'

export default function useChats() {
  const [chats, setChats] = useState<ChatSchema[]>([])
  const safelyRequest = useSafeRequest()
  const authentication = useAuthentication()

  useEffect(() => {
    (async () => {
      const response = await safelyRequest(async () => axios.get(`${API_URL}/chats`, authentication))
      if (!response) {
        return
      }
      setChats(response.data)
    })()
  }, [authentication, safelyRequest])

  return chats
}
