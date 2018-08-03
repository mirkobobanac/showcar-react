import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest'
import * as React from 'react'
import Input from '../../../../src/components/autocomplete/components/Input'

Enzyme.configure({ adapter: new Adapter() })

const inputWithArrowIcon = (
  <Input
    placeholder={'Alle'}
    value={''}
    error={false}
    onChange={() => {}}
    onKeyUpArrow={() => {}}
    onKeyDownArrow={() => {}}
    onKeyEscape={() => {}}
    onKeyEnter={() => {}}
    onClick={() => {}}
    onDropdownClick={() => {}}
    onClearClick={() => {}}
    blurOnKeyEscape={true}
  />
)

const inputWithCloseIcon = (
  <Input
    placeholder={'Alle'}
    value={'abc'}
    error={false}
    onChange={() => {}}
    onKeyUpArrow={() => {}}
    onKeyDownArrow={() => {}}
    onKeyEscape={() => {}}
    onKeyEnter={() => {}}
    onClick={() => {}}
    onDropdownClick={() => {}}
    onClearClick={() => {}}
    blurOnKeyEscape={true}
  />
)

const inputWithoutIcon = (
  <Input
    placeholder={'Alle'}
    value={''}
    error={false}
    onChange={() => {}}
    onKeyUpArrow={() => {}}
    onKeyDownArrow={() => {}}
    onKeyEscape={() => {}}
    onKeyEnter={() => {}}
    onClick={() => {}}
    onDropdownClick={() => {}}
    onClearClick={() => {}}
    blurOnKeyEscape={true}
    hideArrow={true}
  />
)

test('Input is rendered with arrow icon', () => {
  const input = render(inputWithArrowIcon)

  expect(input.find('as24-icon').attr('type')).toEqual('arrow')

  expect(input).toMatchSnapshot()
})

test('Input is rendered with close icon', () => {
  const input = render(inputWithCloseIcon)

  expect(input.find('as24-icon').attr('type')).toEqual('close')
})

test('Input is rendered without an icon', () => {
  const input = render(inputWithoutIcon)

  expect(input.find('as24-icon').get().length).toEqual(0)
})
