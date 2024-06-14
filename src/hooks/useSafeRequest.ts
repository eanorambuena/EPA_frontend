import { AxiosResponse } from 'axios'
import { ApplicationError, AuthenticationError, ItemNotFoundError, NetworkError } from '../services/errors'
import { ToastType, useToast } from './useToast'

type Request = () => Promise<AxiosResponse<any, any>>

type SafeRequestConfig = {
  authenticationError?: string
  authorizationError?: string
  itemNotFoundError?: string
  networkError?: string
  applicationError?: string
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

  return async function safelyRequest(request: Request, config: SafeRequestConfig = {}) {
    try {
      const response = await request()
      handleErrors(response.status, config)
      return response
    }
    catch (error) {
      if (error instanceof ApplicationError) {
        toast(error.message, ToastType.error)
        return
      }

      toast('Ha ocurrido un error desconocido', ToastType.error)
      console.error(error)
    }
  }
}
