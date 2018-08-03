import { withState } from '@dump247/storybook-state'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { addDecorator, storiesOf } from '@storybook/react'
import React from 'react'
import { Autocomplete } from '../src/components/autocomplete/Autocomplete'
import PlainList from '../src/components/autocomplete/datatypes/PlainList'

storiesOf('Core|Organisms/Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Plain List',
    withState({ selected: null as any }, store => (
      <div>
        <h4>Plain list</h4>
        <p>
          > Flat list of items<br />
          <br />
        </p>
        <Autocomplete
          source={props.source}
          selected={store.state.selected}
          onChange={action('search term changed')}
          onSelect={i => {
            store.set({ selected: i })
            action(`entry selected`)(i)
          }}
          disabled={boolean('disabled', false)}
          placeholder={text('placeholder', props.placeholder)}
          suppressErrors={boolean('suppressErrors', false)}
          errorMessage={text('errorMessage', 'no matches for term')}
          hideArrow={boolean('hideArrow', false)}
        />
      </div>
    ))
  )

  .add(
    'Relational List',
    withState({ selected: null as any }, store => (
      <div>
        <h4>Relational list</h4>
        <p>
          > Allows items to be nested under a parent by providing a `parentId`<br />
          <br />
        </p>
        <Autocomplete
          source={{ type: 'relationalList', data: sources.relational }}
          selected={store.state.selected}
          onChange={action('search term changed')}
          onSelect={i => {
            store.set({ selected: i })
            action(`entry selected`)(i)
          }}
          disabled={boolean('disabled', false)}
          placeholder={text('placeholder', props.placeholder)}
          suppressErrors={boolean('suppressErrors', false)}
          errorMessage={text('errorMessage', 'no matches for term')}
          hideArrow={boolean('hideArrow', false)}
        />
      </div>
    ))
  )
  .add(
    'Group List',
    withState({ selected: null as any }, store => (
      <div>
        <h4>Grouped list</h4>
        <p>
          > Shows items by group sections<br />
          <br />
        </p>
        <Autocomplete
          source={{ type: 'grouped', data: sources.groups }}
          selected={store.state.selected}
          onChange={action('search term changed')}
          onSelect={i => {
            store.set({ selected: i })
            action(`entry selected`)(i)
          }}
          disabled={boolean('disabled', false)}
          placeholder={text('placeholder', props.placeholder)}
          suppressErrors={boolean('suppressErrors', false)}
          errorMessage={text('errorMessage', 'no matches for term')}
          hideArrow={boolean('hideArrow', false)}
        />
      </div>
    ))
  )
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Autocomplete {...props} />))
  .add('usage', () => <div />)

const sources = {
  plain: [
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
  ],
  relational: [
    {
      id: -1,
      label: 'Aaron'
    },
    {
      id: 0,
      label: 'Jay (all J belong to me)'
    },
    {
      id: 1,
      label: 'john',
      parentId: 0
    },
    {
      id: 2,
      label: 'johnny',
      parentId: 0
    },
    {
      id: 3,
      label: 'joe',
      parentId: 0
    },
    {
      id: 4,
      label: 'johnannes',
      parentId: 0
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
  ],
  groups: [
    {
      label: 'J names',
      items: [
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
        }
      ]
    },
    {
      label: 'Other names',
      items: [
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
    }
  ]
}

const props = {
  source: {
    type: 'plainList' as 'plainList',
    data: sources.plain
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
