import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Button from '../src/components/button/Button'

// addDecorator(withInfo({ inline: true }))

storiesOf('Core|Atoms/Button', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withInfo({ inline: true })(() => (
      <div>
        <Button type="ross">Ross</Button> &nbsp;
        <Button type="bob">Bob</Button> &nbsp;
        <Button type="ghost">Ghost</Button> &nbsp;
        <Button type="marketing">Marketing</Button>
      </div>
    ))
  )
  .add('example', () => <div>Example here</div>)

storiesOf('Core|Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('colours', () => (
    <div>
      <Button type="ross">Ross</Button> &nbsp;
      <Button type="bob">Bob</Button> &nbsp;
      <Button type="ghost">Ghost</Button> &nbsp;
      <Button type="marketing">Marketing</Button>
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Button type="ross" disabled={boolean('Disabled', true)}>
        Ross
      </Button>
    </div>
  ))
  .add('fullWidth', () => (
    <div>
      <Button type="ross" fullWidth={boolean('Full Width', true)}>
        Ross
      </Button>
    </div>
  ))
