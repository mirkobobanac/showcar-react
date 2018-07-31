import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Notification from '../src/components/notification/Notification'
import { withState } from '@dump247/storybook-state'

const props = {
  type: 'success' as 'success',
  id: '3',
  target: '2',
  title: 'some notification here',
  close: true,
  timeout: 3000
}

storiesOf('Core|Molecules/Notification', module)
  .addDecorator(withKnobs)
  .add(
    'Navigation elements',
    withState({ enabled: false }, store => (
      <div>
        <button onClick={() => store.set({ enabled: true })}>Show notification...</button>
        <Notification
          {...props}
          enabled={store.state.enabled}
          onShow={() => {
            console.log('setting store!')
            store.set({ enabled: false })
          }}
        />
      </div>
    ))
  )

storiesOf('Core|Molecules/Notification', module)
  .addDecorator(
    withInfo({ inline: true, header: false, source: false })(() => <Notification {...props} enabled={true} />)
  )
  .add('usage', () => <div />)
