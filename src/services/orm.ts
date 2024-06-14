import axios from 'axios'
import { API_URL } from './variables'
import { ItemNotFoundError } from './errors'

type Schema = Record<string, any> & { id: number }

class Model<T extends Schema> {
  name: string = ''
  pluralName: string = ''

  async all() {
    const data = await axios.get(`${API_URL}/${this.pluralName}`)
    return data.data
  }

  async find(id: number) {
    const item = await axios.get(`${API_URL}/${this.pluralName}/${id}`)
    if (!item) {
      throw new ItemNotFoundError(`No se encontró ${this.name} con id ${id}`)
    }
    return item
  }

  async findByAttribute(attribute: keyof T, value: string) {
    const item = (await this.all()).find(item => item[attribute] === value)
    if (!item) {
      throw new ItemNotFoundError(`No se encontró ${this.name} con ${String(attribute)} ${value}`)
    }
    return item
  }

  async first() {
    return await this.all()[0]
  }

  setName(name: string) {
    this.name = name
    this.pluralName = name + 's'
  }
}

export const Orm: Record<string, Model<any>> = {}

export function createModel<T extends Schema>(name: string) {
  const x = class extends Model<T> {}
  Orm[name] = new x()
  Orm[name].setName(name)
}
