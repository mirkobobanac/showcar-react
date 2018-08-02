import { IImmutableInput } from './Input'

interface IBaseType<T> {
  size: number
  filter(search: string | null): IBaseType<T>
  isEmpty(): boolean
  itemById(id: T): IImmutableInput<T> | undefined
  itemByIndex(index: number): IImmutableInput<T> | undefined
  /**
   * Returns the position of the item in the data structure or -1 if not found
   */
  indexById(id: T | null): number
}

export const equality = <T>(id1: T | null | undefined, id2: T | null | undefined): boolean => {
  const type = typeof id1
  return type === 'number' || type === 'string' ? id1 === id2 : JSON.stringify(id1) === JSON.stringify(id2)
}

export default IBaseType
