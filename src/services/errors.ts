export class ApplicationError extends Error {
  avoidToast = false

  constructor(message?: string | false) {
    super(message || 'Ha ocurrido un error desconocido')
    if (message == false) {
      this.avoidToast = true
    }
    this.name = 'ApplicationError'
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string | false = 'Debes iniciar sesión para realizar esta acción') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string | false = 'No tienes permiso para acceder a este recurso') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class ItemNotFoundError extends ApplicationError {
  constructor(message: string | false = 'Elemento no encontrado') {
    super(message)
    this.name = 'ItemNotFoundError'
  }
}

export class NetworkError extends ApplicationError {
  constructor(message: string | false = 'Error de red') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string | false) {
    super(message)
    this.name = 'ValidationError'
  }
}
