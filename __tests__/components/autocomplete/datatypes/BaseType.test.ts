import 'jest'
import { equality } from '../../../../src/components/autocomplete/datatypes/IBaseType'

describe('The custom equality function', () => {
  test('Correctly matches numbers', () => {
    expect(equality(1, {})).toBeFalsy()
    expect(equality(1, null)).toBeFalsy()
    expect(equality(1, undefined)).toBeFalsy()

    expect(equality(1, 1)).toBeTruthy()
    expect(equality(1.12293, 1.12293)).toBeTruthy()
  })

  test('Correctly matches strings', () => {
    expect(equality('1', {})).toBeFalsy()
    expect(equality('1', null)).toBeFalsy()
    expect(equality('1', undefined)).toBeFalsy()

    expect(equality('1', '1')).toBeTruthy()
  })

  test('Correctly matches non numbers or strings', () => {
    const subject = { foo: 1, bar: '2' }

    expect(equality(subject, null)).toBeFalsy()
    expect(equality(subject, undefined)).toBeFalsy()
    expect(equality(subject, { foo: 12, bar: '1203' })).toBeFalsy()

    expect(equality(subject, subject)).toBeTruthy()
  })
})
