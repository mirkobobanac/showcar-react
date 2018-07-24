import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Button from '../src/components/button/Button'

// addDecorator(withInfo({ inline: true }))

storiesOf('Button', module).add('with different styles', () => (
  <div>
    <Button type="ross">Ross</Button> &nbsp;
    <Button type="bob">Bob</Button> &nbsp;
    <Button type="ghost">Ghost</Button> &nbsp;
    <Button type="marketing">Marketing</Button>
  </div>
))
