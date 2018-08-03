import { List, Record, RecordR } from '../../../immutability/Immutable'
import BaseType from './IBaseType'
import { IImmutableInput, immutableInput, itemMatchesSearch } from './Input'

export type IImmutablePlainList<T> = List<IImmutablePlainItem<T>>

export type IImmutablePlainItem<T> = RecordR<IPlainItem<T>>

export type IPlainItem<T> = {
  id: T
  label: string
}

export type IPlainList<T> = Array<IPlainItem<T>>

export type IPlainListData<T> = {
  type: 'plainList'
  data: IPlainList<T>
}

const PlainItemToInput = <T>(item: IImmutablePlainItem<T>): IImmutableInput<T> =>
  immutableInput({
    id: item.id,
    label: item.label
  })

const immutablePlainData = <T>(data: IPlainList<T>): IImmutablePlainList<T> => new List(data).map(immutablePlainItem)

const immutablePlainItem = <T>(item: IPlainItem<T>): IImmutablePlainItem<T> =>
  Record.new({
    id: item.id,
    label: item.label
  })

class PlainList<T> implements BaseType<T> {
  // tslint:disable-next-line:variable-name
  private readonly _items: IImmutablePlainList<T>

  constructor(items: IImmutablePlainList<T>)
  // tslint:disable-next-line: unified-signatures
  constructor(items: IPlainList<T>)
  constructor(items: IImmutablePlainList<T> | IPlainList<T>) {
    this._items = Array.isArray(items) ? immutablePlainData(items) : items
  }

  get items() {
    return this._items
  }

  public filter(search: string | null): PlainList<T> {
    return search == null || search.length === 0
      ? this
      : new PlainList(this.items.filter(i => itemMatchesSearch(search)(PlainItemToInput(i))))
  }

  public exists(id: T): boolean {
    return this.itemById(id) !== undefined
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this.items.size
  }

  public itemById = (id: T): IImmutableInput<T> | undefined => this.items.find(i => i.id === id)

  public itemByIndex = (id: number) => this.items.get(id)

  public indexById = (id: T | null) => this.items.findIndex(item => item.id === id) || -1
}

export default PlainList
