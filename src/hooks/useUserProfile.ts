import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProfileSchema } from '../services/schema'
import { API_URL } from '../services/variables'
import useSafeRequest from './useSafeRequest'
import useAuthorizationConfig from './useAuthentication'
import { ToastType, useToast } from './useToast'
import { useNavigate } from 'react-router-dom'

export default function useUserProfile(userId?: number) {
  const authorizationConfig = useAuthorizationConfig<ProfileSchema>()
  const navigate = useNavigate()
  const toast = useToast()
  const safelyRequest = useSafeRequest()
  const [profile, setProfile] = useState<ProfileSchema | null>(null)

  useEffect(() => {
    if (!userId || userId < 0 || profile || !authorizationConfig) {
      return
    }
    (async () => {
      const response = await safelyRequest(async () => axios.get(`${API_URL}/profiles/${userId}`, authorizationConfig),
        {
          itemNotFoundError: false,
          applicationError: 'Error al obtener el perfil'
        })
      if (!response) {
        toast('No tienes un perfil, por favor crea uno', ToastType.warning, () => navigate('/profile'))
        return
      }
      setProfile(response.data)
    })()
  }, [userId, safelyRequest, authorizationConfig, profile, toast, navigate])

  return profile
}
