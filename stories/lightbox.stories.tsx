import { withInfo } from '@storybook/addon-info'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { addDecorator, storiesOf } from '@storybook/react'
import React from 'react'
import { LightBox } from '../src/components/lightbox/LightBox'

storiesOf('Core|Organisms/LightBox', module)
  .addDecorator(withKnobs)
  .add('isShow', () => (
      <LightBox isShow={boolean('isShow', false)}>Content</LightBox>
  ))
  .add('usage', () => <div />)
