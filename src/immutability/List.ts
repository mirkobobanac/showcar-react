import { access } from 'fs'

// interface ImmutableList<T> {
//   map<K>(mapper: (a: T) => K): this<K>
//   filter(predicate: (a: T) => boolean): ImmutableList<T>
//   flatten(): ImmutableList<T>
//   fromArray(a: Array<T>): ImmutableList<T>
// }

class List<T> {
  constructor(private readonly data: ReadonlyArray<T> = []) {}

  public map = <K>(mapper: (a: T) => K): List<K> => new List(this.data.map(mapper))

  public filter = (predicate: (a: T, i: number) => boolean): List<T> => new List(this.data.filter(predicate))

  public filterNot = (predicate: (a: T, i: number) => boolean): List<T> => this.filter((a, i) => !predicate(a, i))

  public flatten = (): List<any> =>
    this.data.reduce((acc: List<T>, v) => (v instanceof List ? acc.concat(v) : acc.push(v)), new List<T>())

  public isEmpty = (): boolean => this.data.length === 0

  get size() {
    return this.data.length
  }

  public find = (predicate: (a: T) => boolean): T | undefined => this.filter(a => predicate(a)).head

  public push = (a: T): List<T> => new List([...this.data, a])

  public concat = (l: List<T>): List<T> => (l.isEmpty() ? this : this.push(l.head!).concat(l.tail))

  public reduce = <K>(reducer: (acc: K, v: T) => K, initialValue: K): K => this.data.reduce(reducer, initialValue)

  get head(): T | undefined {
    return this.data[0]
  }

  get tail(): List<T> {
    return new List(this.data.filter((v, i) => i > 0))
  }

  public findIndex = (predicate: (a: T) => boolean): number | undefined => {
    const matches = this.data.map((v, i) => [v, i] as [T, number]).filter(tuple => predicate(tuple[0]))
    return matches && matches[0] && matches[0][1]
  }

  get toJs() {
    return this.data
  }

  public flatMap = <K>(mapper: (a: T) => List<K>): List<K> => this.map(mapper).flatten()

  /**
   * Returns the value associated with the provided index
   */
  public get(index: number): T | undefined {
    return index < this.data.length ? this.data[index] : undefined
  }
}

export default List
