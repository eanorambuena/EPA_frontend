import { AxiosResponse } from 'axios'
import { ApplicationError, AuthenticationError, ItemNotFoundError, NetworkError } from '../services/errors'
import { ToastType, useToast } from './useToast'
import { useCallback } from 'react'

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
  else if (status == 500) {
    throw new NetworkError(config.networkError)
  }
  else if (status >= 400) {
    throw new ApplicationError(config.applicationError)
  }
}

export default function useSafeRequest() {
  const toast = useToast()

  return useCallback(async function safelyRequest(request: Request, config: SafeRequestConfig = {}) {
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
        return
      }
      toast('Ha ocurrido un error desconocido', ToastType.error)
      console.error(error)
    }
  }, [toast])
}
