import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Pagination from '../src/components/pagination/Pagination'

const props = {
  pageSize: 10,
  currentPage: 3,
  totalItems: 300,
  messages: {
    next: 'next',
    previous: 'prev'
  },
  onPageSelection: () => {
    /**/
  },
  urlTemplate: 'someOtherParam=foo&page={page}',
  autoScrollToTop: true
}

storiesOf('Core|Organisms/Pagination', module)
  .addDecorator(withKnobs)
  .add('Navigation elements', () => (
    <div>
      <Pagination
        pageSize={number('pageSize', 10)}
        currentPage={number('currentPage', 3)}
        totalItems={number('totalItems', 300)}
        messages={{
          next: text('next button', 'next'),
          previous: text('prev button', 'prev')
        }}
        onPageSelection={action('page selected')}
        urlTemplate={text('url template', 'someOtherParam=foo&page={page}')}
        autoScrollToTop={boolean('autoScrollToTop', true)}
      />
    </div>
  ))

storiesOf('Core|Organisms/Pagination', module)
  .addDecorator(withKnobs)
  .add('autoscroll to top', () => (
    <>
      Interact w/ pagination at the bottom...
      <div style={{ height: '1600px' }} />
      <Pagination {...props} autoScrollToTop={boolean('autoScrollToTop', true)} />
    </>
  ))

storiesOf('Core|Organisms/Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <div />))
  .add('usage', () => <div />)
