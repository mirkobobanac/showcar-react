import 'jest'
import * as React from 'react'
import PlainList from '../../../../src/components/autocomplete/datatypes/PlainList'

const instance = new PlainList([
  {
    id: 1,
    label: 'foo'
  },
  {
    id: 101,
    label: 'fooChild1'
  },
  {
    id: 102,
    label: 'fooChild2'
  },
  {
    id: 2,
    label: 'bAr'
  },
  {
    id: 3,
    label: 'baz - some label'
  }
])

const instanceStr = new PlainList([
  {
    id: '1',
    label: 'foo'
  },
  {
    id: '101',
    label: 'fooChild1'
  },
  {
    id: '102',
    label: 'fooChild2'
  },
  {
    id: '2',
    label: 'bAr'
  },
  {
    id: '3',
    label: 'baz - some label'
  }
])

test('PlainList filter does nothing on undefined search', () => {
  const onlyMatching = instance.filter(null)
  expect(onlyMatching).toBe(instance)
})

test('PlainList filters elements by search term correctly', () => {
  expect(instance.filter('foo').size).toBe(3)
  expect(instance.filter('bAr').size).toBe(1)
  expect(instance.filter('bar').size).toBe(1)
  expect(instance.filter('abel').size).toBe(1)

  expect(instanceStr.filter('abel').size).toBe(1)
})

test('PlainList size is computed correctly', () => {
  expect(instance.size).toBe(5)
})

test('PlainList recovers elements by Id correctly', () => {
  expect(instance.itemById(2)!.get('id')).toBe(2)
  expect(instance.itemById(101)!.get('id')).toBe(101)
  expect(instance.itemById(9192913991293)).toBe(undefined)

  expect(instanceStr.itemById('2')!.get('id')).toBe('2')
  expect(instanceStr.itemById('101')!.get('id')).toBe('101')
  expect(instanceStr.itemById('9192913991293')).toBe(undefined)
})

test('PlainList empty method works as expected', () => {
  const empty = instance.filter('SOMETHING_THAT_WONT_MATCH')
  expect(instance.isEmpty()).toBe(false)
  expect(empty.isEmpty()).toBe(true)
})
