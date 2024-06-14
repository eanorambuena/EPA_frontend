import axios from 'axios'
import { API_URL } from './variables'
import { ApplicationError, ItemNotFoundError } from './errors'

type Schema = Record<string, any> & { id: number }

class Model<T extends Schema> {
  name: string = ''

  async all() {
    const data = await axios.get(`${API_URL}/${this.name}`)
    return data.data
  }

  async create(item: T) {
    const data = await axios.post(`${API_URL}/${this.name}`, item)
    if (data.status !== 201) {
      throw new ApplicationError(`Error al crear ${this.name}`)
    }
  }

  async find(id: number) {
    const item = await axios.get(`${API_URL}/${this.name}/${id}`)
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
  }
}

export const Orm: Record<string, Model<any>> = {}

export function createModel<T extends Schema>(name: string) {
  const x = class extends Model<T> {}
  Orm[name] = new x()
  Orm[name].setName(name)
}
