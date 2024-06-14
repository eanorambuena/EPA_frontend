import { createContext, useContext } from 'react'
import { UserSchema } from '../services/schema'

export type AuthContextType = {
  user: UserSchema | null
  logout: () => void
  accessToken: string
}

const AuthContext = createContext<AuthContextType>({ user: null, logout: () => {}, accessToken: '' })
export default AuthContext

export function useCurrentUser() {
  return useContext(AuthContext)
}
