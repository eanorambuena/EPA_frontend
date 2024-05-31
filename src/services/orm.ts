type Schema = Record<string, any> & { id: number }

class Model<T extends Schema> {
  data: T[] = []

  all() {
    return this.data
  }

  find(id: number) {
    const item = this.all().find(item => (item).id === id)
    if (!item) {
      throw new Error(`Item ${id} not found`)
    }
    return item
  }

  findByAttribute(attribute: keyof T, value: string) {
    const item = this.all().find(item => item[attribute] === value)
    if (!item) {
      throw new Error(`Item ${value} not found`)
    }
    return item
  }

  first() {
    return this.all()[0]
  }

  populate(data: T[]) {
    this.data = data
  }

  create(data: T) {
    this.data.push(data)
  }
}

export const Orm: Record<string, Model<any>> = {}

export function createModel<T extends Schema>(name: string) {
  const x = class extends Model<T> {}
  Orm[name] = new x()
}
