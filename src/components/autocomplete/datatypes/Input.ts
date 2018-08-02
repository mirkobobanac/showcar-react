import Record from '../immutability/Record'

export type IImmutableInput<T> = Record<IInput<T>>

export type IInput<T> = {
  id: T
  label: string
}

export const immutableInput = <T>(item: IInput<T>): IImmutableInput<T> => new Record(item)

export const itemMatchesSearch = <T>(search: string) => (item: IImmutableInput<T>): boolean =>
  item
    .get('label')
    .toLowerCase()
    .indexOf(search.toLowerCase()) !== -1
