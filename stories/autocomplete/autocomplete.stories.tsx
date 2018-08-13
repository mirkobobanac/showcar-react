// tslint:disable:no-submodule-imports
import suggestionItemSource from '!raw-loader!../../src/components/autocomplete/components/SuggestionItem'
import plainListSource from '!raw-loader!../../src/components/autocomplete/datatypes/PlainList'
import flatListCustomRenderersSource from '!raw-loader!./FlatListCustomRenderers'
import { withState } from '@dump247/storybook-state'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { addDecorator, storiesOf } from '@storybook/react'
import React from 'react'
import ts from 'typescript'
import sourceCodeExtractor from '../../src/ast/sourceCodeExtractor'
import { Autocomplete } from '../../src/components/autocomplete/Autocomplete'
import PlainList, { CustomeRenderer, IPlainItem } from '../../src/components/autocomplete/datatypes/PlainList'
import Markdown, { stripIndent } from '../markdown/Markdown'
import { flat as flatData, group as groupData, relational as relationalData } from './data'
import { IconizedRenderer, ThumbnailRenderer } from './FlatListCustomRenderers'

storiesOf('Core|Organisms/Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Flat List',
    withState({ selected: null as any }, store => (
      <div>
        <Markdown>{stripIndent`
          ## Flat list
          > Show items all in the same level
        `}</Markdown>
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
    withState({ selected: null as any, renderer: 'icon' }, store => {
      const renderers = {
        icon: IconizedRenderer,
        thumbnail: ThumbnailRenderer
      }
      return (
        <div>
          <Markdown>{`## Custom Flat list \n > Flat list of items w/ customized renderer`}</Markdown>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%', maxWidth: '500px', marginRight: '2em' }}>
              <Autocomplete
                source={{
                  ...props.source,
                  customRenderer: store.state.renderer ? (renderers as any)[store.state.renderer] : undefined
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
              <br />
              <div className="well">
                <Markdown>
                  {`
#### Renderer: 

You can provide a custom renderer that will be used to render each of the items in the list. 
The custom renderer is a JSX Element with the following props
\`\`\`ts
${sourceCodeExtractor(plainListSource, [
                    {
                      kind: ts.SyntaxKind.TypeAliasDeclaration,
                      value: 'CustomeRenderer'
                    },
                    {
                      kind: ts.SyntaxKind.TypeAliasDeclaration,
                      value: 'IPlainItem'
                    }
                  ])}
\`\`\``}
                </Markdown>
              </div>
            </div>
            <div className="well" style={{ flexGrow: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <input
                  type="radio"
                  id="icon"
                  name="renderer"
                  checked={store.state.renderer === 'icon'}
                  onClick={() => store.set({ renderer: 'icon' })}
                  style={{ marginRight: '1em' }}
                />
                <label htmlFor="icon">
                  {IconizedRenderer({
                    onClick: () => {
                      /**/
                    },
                    search: '',
                    selected: false,
                    item: flatData[0]
                  })}
                </label>
              </div>
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id="thumb"
                  name="renderer"
                  onClick={() => store.set({ renderer: 'thumbnail' })}
                  checked={store.state.renderer === 'thumbnail'}
                  style={{ marginRight: '1em' }}
                />
                <label htmlFor="thumb">
                  {ThumbnailRenderer({
                    onClick: () => {
                      /**/
                    },
                    search: '',
                    selected: false,
                    item: flatData[0]
                  })}
                </label>
              </div>
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id="thumb"
                  name="renderer"
                  onClick={() => store.set({ renderer: undefined })}
                  checked={store.state.renderer === undefined}
                  style={{ marginRight: '1em' }}
                />
                <label htmlFor="thumb"> Default renderer </label>
              </div>

              <hr />
              <Markdown style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {stripIndent`
#### Code: 
\`\`\`jsx
${sourceCodeExtractor(store.state.renderer === undefined ? suggestionItemSource : flatListCustomRenderersSource, [
                  {
                    kind: ts.SyntaxKind.VariableStatement,
                    value:
                      store.state.renderer === 'icon'
                        ? 'IconizedRenderer'
                        : store.state.renderer === 'thumbnail'
                          ? 'ThumbnailRenderer'
                          : 'SuggestionItem'
                  }
                ])}
\`\`\``}
              </Markdown>
            </div>
          </div>
        </div>
      )
    })
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
          source={{ type: 'relationalList', data: relationalData }}
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
          source={{ type: 'grouped', data: groupData }}
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

const props = {
  source: {
    type: 'plainList' as 'plainList',
    data: flatData
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
