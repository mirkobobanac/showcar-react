import { withState } from '@dump247/storybook-state'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { addDecorator, storiesOf } from '@storybook/react'
import React from 'react'
import { Autocomplete } from '../src/components/autocomplete/Autocomplete'
import PlainList, { CustomeRenderer, IPlainItem } from '../src/components/autocomplete/datatypes/PlainList'

storiesOf('Core|Organisms/Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Flat List',
    withState({ selected: null as any }, store => (
      <div>
        <h4 className="sc-font-l">Plain list</h4>
        <blockquote>
          Flat list of items<br />
          <br />
        </blockquote>
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
    'Custom Flat List',
    withState({ selected: null as any }, store => (
      <div>
        <h4 className="sc-font-l">Flat Custom list</h4>
        <blockquote>
          Flat list of items w/ customized renderer<br />
          <br />
        </blockquote>
        <Autocomplete
          source={{
            ...props.source,
            customRenderer: FlatListRenderer
          }}
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
        <h4 className="sc-font-l">Relational list</h4>
        <blockquote>
          Allows items to be nested under a parent by providing a `parentId`<br />
          <br />
        </blockquote>
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
        <h4 className="sc-font-l">Grouped list</h4>
        <blockquote>
          Shows items by group sections<br />
          <br />
        </blockquote>
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
      label: 'john',
      avatar: 'https://wiki.teamfortress.com/w/images/6/67/Scoutava.jpg'
    },
    {
      id: 2,
      label: 'johnny',
      avatar: 'https://wiki.teamfortress.com/w/images/f/f2/Soldierava.jpg'
    },
    {
      id: 3,
      label: 'joe',
      avatar: 'https://wiki.teamfortress.com/w/images/4/4b/Demomanava.jpg'
    },
    {
      id: 4,
      label: 'johnannes',
      avatar: 'https://wiki.teamfortress.com/w/images/5/5e/Heavyava.jpg'
    },
    {
      id: 5,
      label: 'mike',
      avatar: 'https://wiki.teamfortress.com/w/images/7/7f/Medicava.jpg'
    },
    {
      id: 6,
      label: 'steve',
      avatar: 'https://wiki.teamfortress.com/w/images/4/44/Sniperava.jpg'
    },
    {
      id: 7,
      label: 'peter',
      avatar: 'https://wiki.teamfortress.com/w/images/3/37/Spyava.jpg'
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

const FlatListRenderer: CustomeRenderer<number> = p => {
  return (
    <div
      onClick={p.onClick}
      style={{
        backgroundColor: p.selected ? 'rgba(0,0,0,0.2)' : 'transparent',
        display: 'flex',
        padding: '0.5em',
        borderBottom: '1px solid #ccc'
      }}
    >
      <img
        style={{
          maxWidth: '50px',
          maxHeight: '50px',
          borderRadius: '30px',
          marginRight: '0.7em'
        }}
        src={sources.plain.filter(s => s.id === p.item.id)[0].avatar}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.1em', textTransform: 'capitalize' }}>
          {p.item.label}
        </h3>
        <p style={{ color: '#999', fontSize: '0.9em' }}>Some text about {p.item.label} here </p>
      </div>
    </div>
  )
}
