import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import OutsideClickDetector from '../src/components/outsideclickdetector/OutsideClickDetector'

storiesOf('Core|Utilities/OutsideClickDetector', module).add('Click Detection', () => (
  <div style={{ backgroundColor: 'pink', padding: '2em', maxWidth: '400px', margin: '0 auto' }}>
    <OutsideClickDetector
      onClickOutside={action('outside click detected!')}
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

storiesOf('Core|Utilities/OutsideClickDetector', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withInfo({ inline: true, header: false, source: false })(() => <OutsideClickDetector onClickOutside={() => {}} />)
  )
  .add('properties', () => <div />)
