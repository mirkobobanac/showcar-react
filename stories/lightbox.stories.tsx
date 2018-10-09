import { withInfo } from '@storybook/addon-info'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Lightbox } from '../src/components/lightbox/Lightbox'
import { Button } from '../src/components/button/Button'
import { withState } from '@dump247/storybook-state'
import Markdown, { stripIndent } from './markdown/Markdown'

const Placeholder = <div style={{ height: 200 }}>Content</div>

storiesOf('Core|Organisms/Lightbox', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Markdown>{stripIndent`
          ## Will all properties

          \`\`\`ts
          <Lightbox
            shown={true}
            className="my-class-name"
            contentClassName="my-content-class-name"
            isLoading={false}
            ignoreOverlayClickClose={false}
            resultMessage="Success Message"
            resultType="success"
            onClose={() => {/* handler */}} >Content</Lightbox>
          \`\`\`

          ## Minimal set
          \`\`\`ts
          <Lightbox shown={false}>Content</Lightbox>
          \`\`\`
        `}</Markdown>
  ))
  .add(
    'resultMessage',
    withState({ shown: false }, store => (
      <>
        <Button type="bob" onClick={() => store.set({ shown: true })}>
          Show Lightbox
        </Button>
        <Lightbox
          shown={store.state.shown}
          resultMessage={text('resultMessage', 'I am resulting message selected type')}
          resultType={select(
            'resultType',
            {
              error: 'Error message',
              success: 'Sucess message'
            },
            'success'
          )}
          onClose={() => store.set({ shown: false })}
        >
          {Placeholder}
        </Lightbox>
      </>
    ))
  )
  .add(
    'shown',
    withState({ shown: false }, store => (
      <>
        <Button type="bob" onClick={() => store.set({ shown: true })}>
          Show Lightbox
        </Button>
        <Lightbox shown={store.state.shown} onClose={() => store.set({ shown: false })}>
          Content
        </Lightbox>
      </>
    ))
  )
  .add(
    'isLoading',
    withState({ shown: false }, store => (
      <>
        <Button type="bob" onClick={() => store.set({ shown: true })}>
          Show Lightbox with loadins state
        </Button>
        <Lightbox shown={store.state.shown} isLoading={true} onClose={() => store.set({ shown: false })}>
          {Placeholder}
        </Lightbox>
      </>
    ))
  )
  .add(
    'ignoreOverlayClickClose',
    withState({ shown: false }, store => (
      <>
        <Button type="bob" onClick={() => store.set({ shown: true })}>
          Show Lightbox and close only using close button
        </Button>
        <Lightbox shown={store.state.shown} ignoreOverlayClickClose={true} onClose={() => store.set({ shown: false })}>
          Content
        </Lightbox>
      </>
    ))
  )
  .addDecorator(
    withInfo({ inline: true, header: false, source: false })(() => <Lightbox shown={false}>Content</Lightbox>)
  )
  .add('usage', () => <div />)
