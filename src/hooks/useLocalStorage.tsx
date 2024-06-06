// https://www.geeksforgeeks.org/reactjs-uselocalstorage-custom-hook/

import { useEffect, useState } from 'react'
 
export default function useLocalStorage(key, defaultValue, liveUpdate = true) {
  const [localStorageValue, setLocalStorageValue] = useState((() => {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    }
  })())
 
  const setLocalStorageStateValue = (valueOrFn) => {
    let newValue
    if (typeof valueOrFn === 'function') {
      const fn = valueOrFn
      newValue = fn(localStorageValue)
    }
    else {
      newValue = valueOrFn
    }
    localStorage.setItem(key, JSON.stringify(newValue))
    setLocalStorageValue(newValue)
  }

  useEffect(() => {
    if (!liveUpdate) return
    setInterval(() => {
      // if changes are made in the localStorage, update the state
      const value = localStorage.getItem(key)
      if (value !== JSON.stringify(localStorageValue) && value !== null) {
        setLocalStorageValue(JSON.parse(value))
      }
    }, 100)
  }, [key, localStorageValue, liveUpdate])

  return [localStorageValue, setLocalStorageStateValue]
}
 
useLocalStorage
