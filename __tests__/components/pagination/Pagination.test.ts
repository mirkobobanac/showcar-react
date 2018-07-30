import initStoryshots from '@storybook/addon-storyshots'
import Pagination, { extractIntParamNumberFromUrl } from '../../../src/components/pagination/Pagination'

initStoryshots({
  storyKindRegex: /\/Pagination$/
})
test('Extracts int parameter from a url', () => {
  expect(extractIntParamNumberFromUrl('/?foo=2')('foo')).toBe(2)
  expect(extractIntParamNumberFromUrl('/?&foo=2&o=1')('foo')).toBe(2)
  expect(extractIntParamNumberFromUrl('/?o=1')('foo')).toBe(null)
  expect(extractIntParamNumberFromUrl('?foo=bar&o=1')('foo')).toBe(null)
  expect(extractIntParamNumberFromUrl('')('foo')).toBe(null)
})
