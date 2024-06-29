import { AxiosResponse } from 'axios'
import { ApplicationError, AuthenticationError, ItemNotFoundError } from '../services/errors'
import { ToastType, useToast } from './useToast'
import { DependencyList, useCallback } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { useNavigate } from 'react-router-dom'
import Debug from '../services/debug'

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

interface StoreValue {
  timestamp: Date
  value: any
  request: Request
}

const STORE_EXPIRATION = 500

class Store {
  private static instance: Store
  private memoizedValues: Map<string, StoreValue> = new Map()
  private constructor() {}

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store()
    }
    return Store.instance
  }

  private setMemoizedValue(key: string, value: StoreValue) {
    this.memoizedValues.set(key, value)
  }

  private getMemoizedValue(key: string): StoreValue | null {
    return this.memoizedValues.get(key) || null
  }

  async saveResponse(key: string, request: Request) {
    const response = await request()
    this.setMemoizedValue(key, {
      timestamp: new Date(),
      value: response,
      request
    })
    return this.getMemoizedValue(key)!.value
  }

  async resolveRequest(request: Request, dependencies: DependencyList = []) {
    const key = `${request} Dependencies: ${JSON.stringify(dependencies)}`
    const storeValue = this.getMemoizedValue(key)
    if (!storeValue) {
      Debug.log(`Request not found in cache, fetching request ${key}`, 'yellow')
      return await this.saveResponse(key, request)
    }
    if (new Date().getTime() - storeValue.timestamp.getTime() > STORE_EXPIRATION) {
      Debug.log(`Cache has expired, refetching request ${key}`, 'cyan')
      return await this.saveResponse(key, request)
    }
    Debug.log(`Resolving request from cache ${key}`, 'green')
    return storeValue.value
  }
}

export default function useSafeRequest() {
  const navigate = useNavigate()
  const toast = useToast()
  const { logout } = useCurrentUser()
  const store = Store.getInstance()

  const safelyRequest = useCallback(async (
    request: Request, dependencies: DependencyList = [], config: SafeRequestConfig = {}) => {
    try {
      try {
        const response = await store.resolveRequest(request, dependencies)
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
  }, [logout, navigate, store, toast])

  return safelyRequest
}
