class Record<T extends Object> {
  constructor(public readonly _record: T) {
    // define dynamic getters for all properties
    // This is for being able to use `.property` on the instance, but right now the type Readonly<T> is not applied
    for (let key in _record) {
      Object.defineProperty(this, key as string, {
        get: function() {
          return this._record[key]
        }
      })
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this._record[key]
  }

  public set<K extends keyof T>(key: K, value: T[K]): Record<T> {
    return new Record(Object.assign({}, this._record, { [key]: value }))
  }

  get toJS() {
    return this._record
  }
}

export default Record
