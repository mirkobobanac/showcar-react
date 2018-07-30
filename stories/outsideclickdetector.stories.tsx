import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import OutsideClickDetector from '../src/components/outsideclickdetector/OutsideClickDetector'
import { withState } from '@dump247/storybook-state'

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

storiesOf('Core|Utilities/OutsideClickDetector', module).add(
  'Click Detection',
  withState({ color: 'pink' }, store => (
    <div style={{ backgroundColor: store.state.color, padding: '2em', maxWidth: '400px', margin: '0 auto' }}>
      <OutsideClickDetector
        onClickOutside={() => {
          action('outside click detected! Switching colors...')()
          store.set({ color: randomColor() })
        }}
        style={{
          backgroundColor: 'wheat',
          width: '200px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '2em'
        }}
      >
        <div>I know when someone clicks outside this box...</div>
      </OutsideClickDetector>
    </div>
  ))
)
Math.floor(Math.random() * 16777215).toString(16)
storiesOf('Core|Utilities/OutsideClickDetector', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withInfo({ inline: true, header: false, source: false })(() => <OutsideClickDetector onClickOutside={() => {}} />)
  )
  .add('usage', () => <div />)
