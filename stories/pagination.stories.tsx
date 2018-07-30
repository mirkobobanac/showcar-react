import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Pagination from '../src/components/pagination/Pagination'
import { withState } from '@dump247/storybook-state'

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
  .add(
    'Navigation elements',
    withState({ currentPage: 3 }, store => (
      <div>
        <Pagination
          pageSize={number('pageSize', 10)}
          currentPage={number('currentPage', store.state.currentPage)}
          totalItems={number('totalItems', 300)}
          messages={{
            next: text('next button', 'next'),
            previous: text('prev button', 'prev')
          }}
          onPageSelection={(page: number, url) => {
            action(`page selected: ${page}, url: ${url}`)()
            store.set({ currentPage: page })
          }}
          urlTemplate={text('url template', 'someOtherParam=foo&page={page}')}
          autoScrollToTop={boolean('autoScrollToTop', true)}
        />
      </div>
    ))
  )

storiesOf('Core|Organisms/Pagination', module)
  .addDecorator(withKnobs)
  .add(
    'autoscroll to top',
    withState({ currentPage: 1 }, store => (
      <>
        Scroll to bottom to interact w/ pagination...
        <div style={{ height: '1600px' }} />
        <span>Choose a page to test autoScroll behaviour...</span>
        <br />
        <br />
        <Pagination
          {...props}
          currentPage={store.state.currentPage}
          onPageSelection={page => store.set({ currentPage: page })}
          autoScrollToTop={boolean('autoScrollToTop', true)}
        />
      </>
    ))
  )

storiesOf('Core|Organisms/Pagination', module)
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Pagination {...props} />))
  .add('usage', () => <div />)
