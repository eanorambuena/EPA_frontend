import { useMemo } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { AxiosRequestConfig } from 'axios'

export default function useAuthorizationHeader<T>() {
  const { accessToken } = useCurrentUser()

  return useMemo<AxiosRequestConfig<T>>(() => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }, [accessToken])
}
