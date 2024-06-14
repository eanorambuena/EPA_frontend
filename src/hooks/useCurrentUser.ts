import { useEffect, useState } from 'react'
import { Auth } from '../services/schema'
import useLocalStorage from './useLocalStorage'

export default function useCurrentUser() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '')
  const [user, setUser] = useState<any>(null)

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

  return [user, logout]
}
