import { List, Record } from '../../../immutability/Immutable'
import BaseType from './IBaseType'
import { IImmutableInput, IInput, immutableInput, itemMatchesSearch } from './Input'

export type IImmutableGroups<T> = List<IImmutableGroup<T>>

export type IGroupedData<T> = {
  type: 'grouped'
  data: Array<IGroup<T>>
}

export type IGroup<T> = {
  label: string
  items: Array<IInput<T>>
}

type RecordR<T> = Record<T>

type IImmutableGroup<T> = RecordR<{
  label: string
  items: List<IImmutableInput<T>>
}>

const immutableGroups = <T>(groups: Array<IGroup<T>>): IImmutableGroups<T> => new List(groups).map(immutableGroup)

const immutableGroup = <T>(group: IGroup<T>): IImmutableGroup<T> =>
  new Record({
    items: new List(group.items.map(immutableInput)),
    label: group.label
  })

class Groups<T> implements BaseType<T> {
  // tslint:disable-next-line:variable-name
  private readonly _items: IImmutableGroups<T>

  constructor(groups: IImmutableGroups<T>)
  // tslint:disable-next-line: unified-signatures
  constructor(groups: Array<IGroup<T>>)
  constructor(groups: IImmutableGroups<T> | Array<IGroup<T>>) {
    this._items = Array.isArray(groups) ? immutableGroups(groups) : groups
  }

  get items(): IImmutableGroups<T> {
    return this._items
  }

  public filter(search: string | null): Groups<T> {
    return search == null || search.length === 0
      ? this
      : new Groups(
          this.items
            .map(group => group.set('items', group.get('items').filter(itemMatchesSearch(search))))
            .filterNot(group => group.get('items').isEmpty())
        )
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  get size() {
    return this.flatten().size
  }

  public itemById = (id: T): IImmutableInput<T> | undefined =>
    this.flatten().find((item: IImmutableInput<T>) => item.get('id') === id)

  public itemByIndex = (id: number) => this.flatten().get(id)

  public indexById = (id: T | null) => this.flatten().findIndex(item => item.get('id') === id) || -1

  private flatten = (): List<IImmutableInput<T>> => this.items.flatMap(group => group.get('items'))
}

export default Groups
