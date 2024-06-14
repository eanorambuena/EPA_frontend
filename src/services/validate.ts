import { ValidationError } from './errors'

export class Validate {
  static PhoneNumber(phoneNumber: string) {
    if (!phoneNumber) {
      throw new ValidationError('Debe ingresar un número de teléfono')
    }
    if (!/^\+569[0-9]{8}$/.test(phoneNumber)) {
      throw new ValidationError('Número de teléfono inválido, debe tener el formato +56912345678')
    }
  }

  static Password(password: string) {
    if (!password) {
      throw new ValidationError('Debe ingresar una contraseña')
    }
    if (password.length < 8) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      throw new ValidationError('La contraseña debe tener al menos una mayúscula')
    }
    if (!/[a-z]/.test(password)) {
      throw new ValidationError('La contraseña debe tener al menos una minúscula')
    }
    if (!/[0-9]/.test(password)) {
      throw new ValidationError('La contraseña debe tener al menos un número')
    }
  }
}

