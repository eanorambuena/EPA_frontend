import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useAuthentication from './useAuthentication'
import useSafeRequest from './useSafeRequest'
import { useSelectedChatId } from './useSelectedChatId'

export default function useChatMembers() {
  const authentication = useAuthentication()
  const navigate = useNavigate()
  const safelyRequest = useSafeRequest()
  const { selectedChatId } = useSelectedChatId()
  const [chatMembers, setChatMembers] = useState<UserSchema[]>([])

  useEffect(() => {
    if (!selectedChatId || selectedChatId < 0) {
      return
    }
    (async () => {
      const response = await safelyRequest(async () => await axios.get(`${API_URL}/chats/${selectedChatId}/members`, authentication), [selectedChatId])
      if (!response) {
        return
      }
      setChatMembers(response.data)
    })()
  }, [authentication, navigate, safelyRequest, selectedChatId])

  return chatMembers
}
