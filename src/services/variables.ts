/// <reference types="vite/client" />
export const API_URL = import.meta.env.VITE_BACKEND_URL

let production
try {
  production = import.meta.env.PROD === true
}
catch (error) {
  production = false
}
export const PRODUCTION = production
