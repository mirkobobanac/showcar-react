import { withInfo } from '@storybook/addon-info'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { addDecorator, storiesOf } from '@storybook/react'
import React from 'react'
import { LightBox } from '../src/components/lightbox/LightBox'
import { Button } from '../src/components/button/Button'
import { withState } from '@dump247/storybook-state'
import Markdown, { stripIndent } from './markdown/Markdown'

const Placeholder = <div style={{ height: 200 }}>Content</div>

storiesOf('Core|Organisms/LightBox', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Markdown>{stripIndent`
          ## Will all properties

          \`\`\`ts
          <LightBox
            isShow={true}
            className="my-class-name"
            contentClassName="my-content-class-name"
            isLoading={false}
            ignoreOverlayClickClose={false}
            resultMessage="Success Message"
            resultType="success"
            onClose={() => {/* handler */}} >Content</LightBox>
          \`\`\`

          ## Minimal set
          \`\`\`ts
          <LightBox isShow={false}>Content</LightBox>
          \`\`\`
        `}</Markdown>
  ))
  .add('resultMessage', withState({ isShow: false }, store => (
    <>
      <Button type="bob" onClick={() => store.set({ isShow: true })}>Show LightBox</Button>
      <LightBox
        isShow={store.state.isShow}
        resultMessage={text("resultMessage", "I am resulting message selected type")}
        resultType={select('resultType', {
          error: "Error message",
          success: "Sucess message"
        }, 'success')}
        onClose={() => store.set({ isShow: false })}
      >{Placeholder}</LightBox>
    </>
  )))
  .add('isShow', withState({ isShow: false }, store => (
    <>
      <Button type="bob" onClick={() => store.set({ isShow: true })}>Show LightBox</Button>
      <LightBox
        isShow={store.state.isShow}
        onClose={() => store.set({ isShow: false })}
      >Content</LightBox>
    </>
  )))
  .add('isLoading', withState({ isShow: false }, store => (
    <>
      <Button type="bob" onClick={() => store.set({ isShow: true })}>Show LightBox with loadins state</Button>
      <LightBox
        isShow={store.state.isShow}
        isLoading={true}
        onClose={() => store.set({ isShow: false })}
      >{Placeholder}</LightBox>
    </>
  )))
  .add('ignoreOverlayClickClose', withState({ isShow: false }, store => (
    <>
      <Button type="bob" onClick={() => store.set({ isShow: true })}>Show LightBox and close only using close button</Button>
      <LightBox
        isShow={store.state.isShow}
        ignoreOverlayClickClose={true}
        onClose={() => store.set({ isShow: false })}
      >Content</LightBox>
    </>
  )))
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <LightBox isShow={false}>Content</LightBox>))
  .add('usage', () => <div />)
