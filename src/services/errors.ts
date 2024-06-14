export class ApplicationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message = 'Debes iniciar sesión para realizar esta acción') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message = 'No tienes permiso para acceder a este recurso') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class ItemNotFoundError extends ApplicationError {
  constructor(message = 'Elemento no encontrado') {
    super(message)
    this.name = 'ItemNotFoundError'
  }
}

export class NetworkError extends ApplicationError {
  constructor(message = 'Error de red') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}
