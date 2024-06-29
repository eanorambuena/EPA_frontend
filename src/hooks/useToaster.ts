import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastType } from './useToast'
import axios from 'axios'

const TOAST_DURATION = 3000
const TOAST_EXPIRATION = 10000
const BASE_STYLE = 'fixed bottom-4 right-4 p-4 rounded-md shadow-md z-10'

type VoidFn = () => void

export type ToastAction = (message: string, toastType?: ToastType, action?: VoidFn) => void

interface ToastData {
  message: string
  toastType: ToastType
  createdAt: number
  action?: VoidFn
}

type ToastRef = React.MutableRefObject<HTMLDivElement | null>

export default function useToaster(className: string = '') {
  const [action, setAction] = useState<VoidFn | undefined>(undefined)
  const [message, setMessage] = useState<string>('')
  const [toasted, setToasted] = useState<boolean>(false)
  const [toastSchedule, setToastSchedule] = useState<ToastData[]>([])
  const [toastType, setToastType] = useState<ToastType>(ToastType.default)
  const ref = useRef<HTMLDivElement | null>(null)

  const showToast = useCallback<ToastAction>((message, toastType = ToastType.default, action?) => {
    setMessage(message)
    setToastType(toastType)
    setAction(action)
    setToasted(true)
  }, [])

  const addToastToSchedule = useCallback<ToastAction>((message, toastType = ToastType.default, action?) => {
    const newToast = { message, toastType, createdAt: Date.now(), action }
    setToastSchedule(toastSchedule => [...toastSchedule, newToast])
  }, [])

  const removeToastFromSchedule = useCallback<VoidFn>(() => {
    setToastSchedule(toastSchedule.slice(1))
  }, [toastSchedule])

  useEffect(() => {
    if (toastSchedule.length === 0) {
      return
    }
    const { message, toastType, action, createdAt } = toastSchedule[0]
    if (Date.now() - createdAt >= TOAST_EXPIRATION) {
      removeToastFromSchedule()
      return
    }
    showToast(message, toastType, action)
  }, [toastSchedule, showToast, removeToastFromSchedule])

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ERR_NETWORK') {
        addToastToSchedule('Error de red', ToastType.error)
      }
      else if (error.code === 'ECONNABORTED') {
        addToastToSchedule('Tiempo de espera agotado', ToastType.error)
      }
      else if (error.code === 'ECONNREFUSED') {
        addToastToSchedule('Servidor no disponible', ToastType.error)
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    if (!ref.current || !toasted) {
      return
    }
    ref.current.className = `${BASE_STYLE} ${toastType} opacity-1
      transform -translate-y-4
      transition duration-300
      fill-mode-forwards ${className}`
    ref.current.textContent = message
    if (action) {
      action()
    }
    setToasted(false)
    setTimeout(() => {
      if (!ref.current) {
        return
      }
      ref.current.className = `${BASE_STYLE} opacity-0 ${className}`
      removeToastFromSchedule()
    }, TOAST_DURATION)
  }, [className, message, toasted, toastType, removeToastFromSchedule, action])

  return [ref, addToastToSchedule] as [ToastRef, ToastAction]
}
