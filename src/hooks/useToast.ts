import { createContext, useContext } from 'react'
import { ToastAction } from './useToaster'

export enum ToastType {
  success = 'bg-green-500',
  error = 'bg-red-500',
  warning = 'bg-yellow-500',
  info = 'bg-blue-500',
  default = 'bg-gray-50 dark:bg-gray-950'
}

const ToastContext = createContext<ToastAction>((() => {}) as ToastAction)
export default ToastContext

export function useToast() {
  return useContext(ToastContext)
}
