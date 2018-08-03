import 'jest'
import * as React from 'react'
import RelationalList, { IRelationalList } from '../../../../src/components/autocomplete/datatypes/RelationalList'

type ComplexId = { id: number; hash: string }
const complexId = (id: number): ComplexId => ({ id, hash: String(id * 20) })

const data: IRelationalList<ComplexId> = [
  {
    id: complexId(1),
    label: 'foo'
  },
  {
    id: complexId(101),
    label: 'fooChild1',
    parentId: complexId(2)
  },
  {
    id: complexId(102),
    label: 'fooChild2',
    parentId: complexId(2)
  },
  {
    id: complexId(2),
    label: 'bAr'
  },
  {
    id: complexId(3),
    label: 'baz - some label'
  }
]

const instance = new RelationalList(data)

test('RelationalList filter does nothing on undefined search', () => {
  const onlyMatching = instance.filter(null)
  expect(onlyMatching).toBe(instance)
})

test('RelationalList filters elements by search term correctly', () => {
  expect(instance.filter('foo').size).toBe(3)
  expect(instance.filter('bAr').size).toBe(1)
  expect(instance.filter('bar').size).toBe(1)
  expect(instance.filter('abel').size).toBe(1)
})

test('RelationalList size is computed correctly', () => {
  expect(instance.size).toBe(5)
})

test('RelationalList recovers elements by Id correctly', () => {
  expect(instance.itemById(complexId(2))!.get('id')).toEqual(complexId(2))
  expect(instance.itemById(complexId(101))!.get('id')).toEqual(complexId(101))

  expect(instance.itemById(complexId(9192913991293))).toEqual(undefined)
})

test('RelationalList empty method works as expected', () => {
  const empty = instance.filter('SOMETHING_THAT_WONT_MATCH')
  expect(instance.isEmpty()).toBe(false)
  expect(empty.isEmpty()).toBe(true)
})
