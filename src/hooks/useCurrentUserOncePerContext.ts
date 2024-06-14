import { useEffect, useState } from 'react'
import { Auth, UserSchema } from '../services/schema'
import useLocalStorage from './useLocalStorage'
import { AuthContextType } from './useCurrentUser'

export default function useCurrentUserOnePerContext() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '')
  const [user, setUser] = useState<UserSchema | null>(null)

  useEffect(() => {
    if (accessToken && !user) {
      (async () => {
        const currentUser = await Auth.getCurrentUser()
        setUser(currentUser)
      })()
    }
  }, [accessToken, user])

  const logout = () => {
    Auth.logout()
    setUser(null)
    setAccessToken('')
  }

  return {user, logout, accessToken} as AuthContextType
}
