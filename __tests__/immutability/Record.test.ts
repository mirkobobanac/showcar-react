import { Record } from '../../src/immutability/Immutable'

const record = Record.new({
  s: 'foo',
  n: 12
})

describe('get', () => {
  it('returns the proper value, via get or `.` accessor property', () => {
    expect(record.s).toBe('foo')
    expect(record.n).toBe(12)
    expect(record.get('n')).toBe(12)
  })
})

describe('set', () => {
  it('generates a new record with updated values', () => {
    expect(record.set('s', 'bar').toJS).toEqual({ s: 'bar', n: 12 })
    expect(record !== record.set('s', 'foo'))
  })
})
