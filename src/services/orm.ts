class Model<T> {
  data: T[] = []

  all() {
    return this.data
  }

  populate(data: T[]) {
    this.data = data
  }

  find(id: number) {
    const item = this.all().find(item => (item as any).id === id)
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
}

export const Orm: Record<string, Model<any>> = {}

export function createModel<T>(name: string) {
  const x = class extends Model<T> {}
  Orm[name] = new x()
}
