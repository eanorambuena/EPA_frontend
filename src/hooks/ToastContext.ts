import { createContext } from 'react'
import { ToastAction } from './useToast'

const ToastContext = createContext<ToastAction>((() => {}) as ToastAction)
export default ToastContext
