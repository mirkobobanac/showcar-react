import React from 'react'

import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { ToggleComponent } from '../src/components/toggle/Toggle'

storiesOf('Core|Molecules/Toggle', module)
  .addDecorator(withKnobs)
  .add('With no promise', () => (
    <div>
      <ToggleComponent checked={false} handleChange={(toggled: boolean) => console.log('handling stuff')} />
    </div>
  ))

storiesOf('Core|Molecules/Toggle', module)
  .addDecorator(withKnobs)
  .add('With promise', () => (
    <div>
      <ToggleComponent checked={false} async={true} handleChange={() => console.log('handled')} />
    </div>
  ))
