import { useMemo } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { AxiosRequestConfig } from 'axios'

export default function useAuthentication<T>() {
  const { accessToken } = useCurrentUser()

  return useMemo<AxiosRequestConfig<T>>(() => {
    if (!accessToken) {
      return {}
    }
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }, [accessToken])
}
