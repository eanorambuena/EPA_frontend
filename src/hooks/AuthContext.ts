import { createContext } from 'react'

type AuthContextType = {
  user: any
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({ user: null, logout: () => {} })
export default AuthContext
