import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { Button } from '../src/components/button/Button'

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
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Button type="ross">Ross</Button>))
  .add('usage', () => <div />)
