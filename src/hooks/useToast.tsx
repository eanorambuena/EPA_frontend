import React, { useCallback, useEffect, useRef, useState } from 'react'

const TOAST_DURATION = 3000
const TOAST_EXPIRATION = 10000
const BASE_STYLE = 'fixed bottom-4 right-4 p-4 rounded-md shadow-md z-10'

export enum ToastType {
  success = 'bg-green-500',
  error = 'bg-red-500',
  warning = 'bg-yellow-500',
  info = 'bg-blue-500',
  default = 'bg-gray-50 dark:bg-gray-950'
}

export type ToastAction = (message: string, toastType?: ToastType) => void

interface ToastData {
  message: string
  toastType: ToastType
  createdAt: number
}

export default function useToast(className: string = '') {
  const [toasted, setToasted] = useState<boolean>(false)
  const [toastSchedule, setToastSchedule] = useState<ToastData[]>([])
  const [message, setMessage] = useState<string>('')
  const [toastType, setToastType] = useState<ToastType>(ToastType.default)
  const ref = useRef<HTMLDivElement | null>(null)

  const showToast = useCallback<ToastAction>((message, toastType = ToastType.default) => {
    setMessage(message)
    setToastType(toastType)
    setToasted(true)
  }, [])

  const addToastToSchedule = useCallback<ToastAction>((message, toastType = ToastType.default) => {
    setToastSchedule(toastSchedule => [...toastSchedule, { message, toastType, createdAt: Date.now()}])
  }, [])

  const removeToastFromSchedule = useCallback<() => void>(() => {
    console.log('removing toast', toastSchedule[0])
    setToastSchedule(toastSchedule.slice(1))
    console.log('toast schedule', toastSchedule)
  }, [toastSchedule])

  const toast = useCallback<ToastAction>((message, toastType = ToastType.default) => {
    addToastToSchedule(message, toastType)
  }, [addToastToSchedule])

  useEffect(() => {
    if (toastSchedule.length === 0) {
      return
    }
    const { message, toastType, createdAt } = toastSchedule[0]
    if (Date.now() - createdAt >= TOAST_EXPIRATION) {
      removeToastFromSchedule()
      return
    }
    showToast(message, toastType)
  }, [toastSchedule, showToast, removeToastFromSchedule])

  useEffect(() => {
    if (!ref.current || !toasted) {
      return
    }
    ref.current.className = `${BASE_STYLE} ${toastType} opacity-1
      transform -translate-y-4
      transition duration-300
      fill-mode-forwards ${className}`
    ref.current.textContent = message
    setToasted(false)
    setTimeout(() => {
      if (!ref.current) {
        return
      }
      ref.current.className = `${BASE_STYLE} opacity-0 ${className}`
      removeToastFromSchedule()
    }, TOAST_DURATION)
  }, [className, message, toasted, toastType, removeToastFromSchedule])

  return [ref, toast] as [React.MutableRefObject<HTMLDivElement | null>, ToastAction]
}
