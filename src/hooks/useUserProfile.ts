import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProfileSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useSafeRequest from './useSafeRequest'
import useAuthorizationConfig from './useAuthorizationConfig'

export default function useUserProfile(userId: number) {
  const authorizationConfig = useAuthorizationConfig<ProfileSchema>()
  const [profile, setProfile] = useState<ProfileSchema | null>(null)
  const safelyRequest = useSafeRequest()

  useEffect(() => {
    (async () => {
      const response = await safelyRequest(async () => axios.get(`${API_URL}/users/${userId}`, authorizationConfig))
      if (!response) {
        return
      }
      setProfile(response.data)
    })()
  }, [userId, safelyRequest, authorizationConfig])

  return profile
}
