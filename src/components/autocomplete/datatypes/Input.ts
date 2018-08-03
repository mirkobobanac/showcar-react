import Record, { RecordR } from '../../../immutability/Record'

export type IImmutableInput<T> = RecordR<IInput<T>>

export type IInput<T> = {
  id: T
  label: string
}

export const immutableInput = <T>(item: IInput<T>): IImmutableInput<T> => Record.new(item)

export const itemMatchesSearch = <T>(search: string) => (item: IImmutableInput<T>): boolean =>
  item.label.toLowerCase().indexOf(search.toLowerCase()) !== -1
