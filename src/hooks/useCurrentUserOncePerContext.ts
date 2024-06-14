import { useEffect, useState } from 'react'
import { Auth, UserSchema } from '../services/schema'
import useLocalStorage from './useLocalStorage'
import { AuthContextType } from './useCurrentUser'
import { ToastType, useToast } from './useToast'
import { ApplicationError } from '../services/errors'

export default function useCurrentUserOnePerContext() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '')
  const toast = useToast()
  const [user, setUser] = useState<UserSchema | null>(null)

  useEffect(() => {
    if (accessToken && !user) {
      (async () => {
        try {
          const currentUser = await Auth.getCurrentUser()
          setUser(currentUser)
        }
        catch (error) {
          console.log('Error getting current user', error)
          if (error instanceof ApplicationError) {
            toast(error.message, ToastType.error)
            console.log('toasted')
            return
          }
        }
      })()
    }
  }, [accessToken, toast, user])

  const logout = () => {
    Auth.logout()
    setUser(null)
    setAccessToken('')
    localStorage.clear()
  }

  return {user, logout, accessToken} as AuthContextType
}
