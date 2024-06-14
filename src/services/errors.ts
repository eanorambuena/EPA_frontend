export class ApplicationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}
