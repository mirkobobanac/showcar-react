import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import Button from '../src/components/button/Button'

storiesOf('Button', module).add('with text', () => <Button type="ross">Some Button</Button>)
