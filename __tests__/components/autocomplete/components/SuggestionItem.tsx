import Enzyme, { shallow } from 'enzyme'
import * as React from 'react'
import SuggestionItem, { highlightMatches } from '../../../../src/components/autocomplete/components/SuggestionItem'

const regexSpecialChars = ' + * ? [ ^ ] $ ( ) { } = ! < > | : -'
const original = `foo (bar)//+* baz baz`

test('Highlighter transforms matching string correctly', () => {
  expect(highlightMatches(original, 'foo')).toBe(`<strong>foo</strong> (bar)//+* baz baz`)
  expect(highlightMatches(original, regexSpecialChars)).toBe(original)
  expect(highlightMatches(original, 'baz')).toBe('foo (bar)//+* <strong>baz</strong> <strong>baz</strong>')
  expect(highlightMatches(original, '(bar)')).toBe('foo <strong>(bar)</strong>//+* baz baz')
})
