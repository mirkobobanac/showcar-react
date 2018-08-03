/**
 * A class encapsulating an object that cannot be mutated.
 * Use `Record.new` to instantiate instances (props can then be access via `.` accessors)
 */
class Record<T extends Object> {
  get toJS() {
    return this.record
  }
  public static new<K>(record: K): RecordR<K> {
    return new Record<K>(record) as RecordR<K>
  }
  constructor(private readonly record: T) {
    // define dynamic getters for all properties
    // This is for being able to use `.property` on the instance, but right now the type Readonly<T> is not applied
    // tslint:disable-next-line:forin
    for (const key in record) {
      Object.defineProperty(this, key as string, {
        get() {
          return this.record[key]
        }
      })
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.record[key]
  }

  public set<K extends keyof T>(key: K, value: T[K]): RecordR<T> {
    // tslint:disable-next-line:prefer-object-spread  TypeScript bug
    return Record.new(Object.assign({}, this.record, { [key]: value })) as RecordR<T>
  }
}

export type RecordR<T> = Record<T> & Readonly<T>

export default Record
