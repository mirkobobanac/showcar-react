import { List } from '../../src/immutability/Immutable'

const identity = <T>(x: T) => x

const list = new List([1, 2, 3])

describe('map', () => {
  it('converts list to another type', () => {
    expect(list.map(x => x * 2).toJs).toEqual(new List([2, 4, 6]).toJs)
  })

  it('doesnt mutate original list', () => {
    const list = new List()
    expect(list.map(identity) === list).toBeFalsy()
  })
})

describe('filter', () => {
  it('removes non-matching elements', () => {
    expect(list.filter(n => n % 2 === 0).head).toBe(2)
    expect(list.filterNot(n => n % 2 === 0).size).toBe(2)
  })

  it('doesnt mutate original list', () => {
    expect(list.filter(x => true) === list).toBeFalsy()
  })
})

describe('find', () => {
  it('returns item if matching predicate or undefined otherwise', () => {
    expect(list.find(x => x > 2)).toBe(3)
    expect(list.find(x => x < 0)).toBeUndefined
  })
})

describe('findIndex', () => {
  it('returns number key of first match matching predicate or undefined otherwise', () => {
    expect(new List(['a', 'b', 'c', 'c']).findIndex(x => x === 'c')).toBe(2)
    expect(list.findIndex(x => x === 999)).toBeUndefined
  })
})

describe('push', () => {
  it('adds element at end of list', () => {
    expect(list.push(4).size).toBe(4)
    expect(list.push(4).toJs).toEqual([1, 2, 3, 4])
  })
})

describe('head', () => {
  it('returns first element in list if present, otherwise undefined', () => {
    expect(list.head).toBe(1)
    expect(new List().head).toBeUndefined
  })

  it('doesnt mutate original list', () => {
    list.head
    expect(list.size).toBe(3)
  })
})

describe('tail', () => {
  it('returns a list without its first element', () => {
    expect(list.tail.toJs).toEqual([2, 3])
    expect(new List().tail.toJs).toEqual([])
  })

  it('doesnt mutate original list', () => {
    list.tail
    expect(list.size).toBe(3)
  })
})

describe('isEmpty', () => {
  it('returns true/false depending on list having no elements or not', () => {
    expect(list.isEmpty()).toBeFalsy()
    expect(new List().isEmpty()).toBeTruthy()
  })

  it('doesnt mutate original list', () => {
    list.head
    expect(list.size).toBe(3)
  })
})

describe('concat', () => {
  it('joins a list to another', () => {
    expect(list.concat(new List([20])).toJs).toEqual([1, 2, 3, 20])
  })

  it('returns original list if there is nothing to concatenate', () => {
    expect(list.concat(new List()) === list).toBeTruthy()
  })

  it('doesnt mutate original list if there is something appended', () => {
    list.concat(new List([4]))
    expect(list.size).toBe(3)
  })
})

describe('flatten', () => {
  it('turns nested List entries into a shallow list', () => {
    expect(new List([2, new List([3, 4])]).flatten().toJs).toEqual([2, 3, 4])
  })
})

describe('reduce', () => {
  it('reduces the list to a value', () => {
    expect(list.reduce((acc, n) => acc + n, 0)).toEqual(6)
  })
})

describe('flatMap', () => {
  it('maps & flattens in one operation', () => {
    expect(list.flatMap(n => new List([n])).toJs).toEqual(list.toJs)
  })
})

describe('get', () => {
  it('returns the value at key or undefined', () => {
    expect(list.get(2)).toBe(3)
    expect(list.get(10)).toBeUndefined
  })
})
