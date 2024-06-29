import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { ProfileSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useSafeRequest from './useSafeRequest'
import useAuthorizationConfig from './useAuthentication'

export default function useUserProfile(userId?: number) {
  const authorizationConfig = useAuthorizationConfig<ProfileSchema>()
  const safelyRequest = useSafeRequest()
  const [profile, setProfile] = useState<ProfileSchema | null>(null)
  const [profileRequested, setProfileRequested] = useState(false)

  const asyncSetStates = useCallback(async () => {
    const response = await safelyRequest(async () => axios.get(`${API_URL}/profiles/${userId}`, authorizationConfig), [userId],
      {
        itemNotFoundError: 'No tienes un perfil, por favor crea uno',
        applicationError: 'Error al obtener el perfil'
      })
    if (!response) {
      return
    }
    setProfile(response.data)
  }, [authorizationConfig, safelyRequest, userId])


  useEffect(() => {
    if (profileRequested || !userId || userId < 0 || profile || !authorizationConfig) {
      return
    }
    setProfileRequested(true)
    asyncSetStates()
  }, [asyncSetStates, authorizationConfig, profile, profileRequested, userId])

  return profile
}
