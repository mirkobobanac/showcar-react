class Record<T extends Object> {
  constructor(private readonly record: T) {
    // define dynamic getters for all properties
    // This is for being able to use `.property` on the instance, but right now the type Readonly<T> is not applied
    // tslint:disable-next-line:forin
    for (const key in record) {
      Object.defineProperty(this, key as string, {
        get() {
          return this._record[key]
        }
      })
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.record[key]
  }

  public set<K extends keyof T>(key: K, value: T[K]): Record<T> {
    // tslint:disable-next-line:prefer-object-spread  TypeScript bug
    return new Record(Object.assign({}, this.record, { [key]: value }))
  }

  get toJS() {
    return this.record
  }
}

export default Record
