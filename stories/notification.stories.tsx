import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'
import Notification from '../src/components/notification/Notification'
import { withState } from '@dump247/storybook-state'

const props = {
  type: 'success' as 'success',
  title: 'some title here',
  close: true
  // timeout: 3000
}

storiesOf('Core|Molecules/Notification', module)
  .addDecorator(withKnobs)
  .add('types', () => {
    const titleProp = text('title', 'some title here...')
    const description = text('description', 'some description here...')
    return (
      <div>
        <Notification {...props} title={titleProp} type="success">
          {description}
        </Notification>
        <Notification {...props} title={titleProp} type="information">
          {description}
        </Notification>
        <Notification {...props} title={titleProp} type="error">
          {description}
        </Notification>
        <Notification {...props} title={titleProp} type="tip">
          {description}
        </Notification>
      </div>
    )
  })
  .add(
    'interactive',
    withState({ show: false }, store => (
      <>
        <button onClick={() => store.set({ show: true })}>[WIP] Show notification...</button>
        {store.state.show && (
          <Notification
            type={select('type', ['success', 'information', 'error', 'tip'], 'success')}
            title={text('title', 'some notification here...')}
            close={boolean('closeButton', true)}
            // timeout={number('timeout', 2000)}
            onClose={() => {
              store.set({ show: false })
            }}
          >
            {text('text', 'Some bigger description...')}
          </Notification>
        )}
      </>
    ))
  )

storiesOf('Core|Molecules/Notification', module)
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Notification {...props} />))
  .add('usage', () => <div />)
