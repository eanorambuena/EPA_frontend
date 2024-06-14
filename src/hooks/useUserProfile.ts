import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProfileSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useSafeRequest from './useSafeRequest'
import useAuthorizationConfig from './useAuthentication'

export default function useUserProfile(userId?: number) {
  const authorizationConfig = useAuthorizationConfig<ProfileSchema>()
  const [profile, setProfile] = useState<ProfileSchema | null>(null)
  const safelyRequest = useSafeRequest()

  useEffect(() => {
    if (!userId || userId < 0 || profile || !authorizationConfig) {
      return
    }
    (async () => {
      const response = await safelyRequest(async () => axios.get(`${API_URL}/profiles/${userId}`, authorizationConfig),
        {
          itemNotFoundError: 'No se ha encontrado el perfil',
          applicationError: 'Error al obtener el perfil'
        })
      if (!response) {
        return
      }
      setProfile(response.data)
    })()
  }, [userId, safelyRequest, authorizationConfig, profile])

  return profile
}
