import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { Autocomplete } from '../src/components/autocomplete/Autocomplete'
import PlainList from '../src/components/autocomplete/datatypes/PlainList'

const props = {
  source: {
    type: 'plainList' as 'plainList',
    data: [
      {
        id: 1,
        label: 'john'
      },
      {
        id: 2,
        label: 'johnny'
      },
      {
        id: 3,
        label: 'joe'
      },
      {
        id: 4,
        label: 'johnannes'
      },
      {
        id: 5,
        label: 'mike'
      },
      {
        id: 6,
        label: 'steve'
      },
      {
        id: 7,
        label: 'peter'
      }
    ]
  },
  selected: null,
  onChange: (search: string) => {
    console.log(search)
  },
  onSelect: (t: any) => {
    console.log(t)
  },
  disabled: false,
  placeholder: 'placeholder here',
  suppressErrors: false,
  errorMessage: 'not match',
  hideArrow: false
}

storiesOf('Core|Organisms/Autocomplete', module)
  .addDecorator(withKnobs)
  .add('autocomplete', () => (
    <div>
      <Autocomplete {...props} />
    </div>
  ))
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Autocomplete {...props} />))
  .add('usage', () => <div />)
