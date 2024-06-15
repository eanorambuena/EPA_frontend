import { AxiosResponse } from 'axios'
import { ApplicationError, AuthenticationError, ItemNotFoundError } from '../services/errors'
import { ToastType, useToast } from './useToast'
import { useCallback } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { useNavigate } from 'react-router-dom'

type Request = () => Promise<AxiosResponse<any, any>>

type SafeRequestConfig = {
  authenticationError?: string | false
  authorizationError?: string | false
  itemNotFoundError?: string | false
  networkError?: string | false
  applicationError?: string | false
}

const handleErrors = (status: number, config: SafeRequestConfig) => {
  if (status === 401) {
    throw new AuthenticationError(config.authenticationError)
  }
  else if (status === 403) {
    throw new AuthenticationError(config.authorizationError)
  }
  else if (status === 404) {
    throw new ItemNotFoundError(config.itemNotFoundError)
  }
  else if (status >= 400) {
    throw new ApplicationError(config.applicationError)
  }
}

const FREEZE_TIME = 1000

export default function useSafeRequest() {
  const navigate = useNavigate()
  const toast = useToast()
  const { logout } = useCurrentUser()

  const getLastRequestDate = useCallback(() => {
    return parseInt(localStorage.getItem('lastRequestDate') || '0')
  }, [])

  return useCallback(async function safelyRequest(request: Request, config: SafeRequestConfig = {}) {
    if (Date.now() - getLastRequestDate() < FREEZE_TIME) {
      await new Promise(resolve => setTimeout(resolve, FREEZE_TIME - (Date.now() - getLastRequestDate())))
      return
    }
    localStorage.setItem('lastRequestDate', Date.now().toString())
    try {
      try {
        const response = await request()
        handleErrors(response.status, config)
        return response
      }
      catch (error) {
        if (error instanceof ApplicationError) {
          if (!error.avoidToast) {
            toast(error.message, ToastType.error)
          }
          return
        }
        handleErrors(error.response?.status, config)
        toast('Ha ocurrido un error desconocido', ToastType.error)
        console.error(error)
      }
    }
    catch (error) {
      if (error instanceof ApplicationError) {
        if (!error.avoidToast) {
          toast(error.message, ToastType.error)
        }
        if (error instanceof AuthenticationError) {
          logout()
          navigate('/login')
        }
        return
      }
      toast('Ha ocurrido un error desconocido', ToastType.error)
      console.error(error)
    }
  }, [getLastRequestDate, logout, navigate, toast])
}
