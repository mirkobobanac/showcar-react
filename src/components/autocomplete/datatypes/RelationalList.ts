import { List, Record, RecordR } from '../../../immutability/Immutable'
import BaseType, { equality } from './IBaseType'
import { IImmutableInput, immutableInput, itemMatchesSearch } from './Input'

export type IImmutableRelationalList<T> = List<IImmutableRelationalItem<T>>

export type IImmutableRelationalItem<T> = RecordR<IRelationalItem<T>>

export type IRelationalItem<T> = {
  id: T
  label: string
  parentId?: T | undefined
}

export type IRelationalList<T> = Array<IRelationalItem<T>>

export type IRelationalListData<T> = {
  type: 'relationalList'
  data: IRelationalList<T>
}

const relationalItemToInput = <T>(item: IImmutableRelationalItem<T>): IImmutableInput<T> =>
  immutableInput({
    id: item.id,
    label: item.label
  })

const immutableRelationalData = <T>(data: IRelationalList<T>): IImmutableRelationalList<T> =>
  new List(data).map(immutableRelationalItem)

const immutableRelationalItem = <T>(item: IRelationalItem<T>): IImmutableRelationalItem<T> =>
  Record.new({
    id: item.id,
    label: item.label,
    parentId: item.parentId
  })

class RelationalList<T> implements BaseType<T> {
  // tslint:disable-next-line:variable-name
  private readonly _items: IImmutableRelationalList<T>

  constructor(items: IImmutableRelationalList<T>)
  // tslint:disable-next-line: unified-signatures
  constructor(items: IRelationalList<T>)
  constructor(items: IImmutableRelationalList<T> | IRelationalList<T>) {
    this._items = Array.isArray(items) ? immutableRelationalData(items) : items
  }

  get items() {
    return this._items
  }

  public filter(search: string | null): RelationalList<T> {
    return search == null || search.length === 0
      ? this
      : new RelationalList(this.items.filter(i => itemMatchesSearch(search)(relationalItemToInput(i))))
  }

  public exists(id: T): boolean {
    return this.itemById(id) !== undefined
  }

  public filterByParentId(parentId: T): RelationalList<T> {
    return new RelationalList(this.items.filter(item => equality(item.parentId, parentId)))
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this.items.size
  }

  public itemById = (id: T): IImmutableInput<T> | undefined => this.items.find(i => equality(id, i.id))

  public itemByIndex = (id: number) => this.items.get(id)

  public indexById = (id: T | null) => this.items.findIndex(item => equality(item.id, id)) || -1
}

export default RelationalList
