import hljs from 'highlight.js'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import '../../node_modules/github-markdown-css/github-markdown.css' // include css instead of regular JS include because Jest breaks otherwise
import '../../node_modules/highlight.js/styles/github.css' // github code style highlighting

/**
 * Markdown wrapper that includes github-markdown styles
 */
const Markdown: React.SFC<ReactMarkdown.ReactMarkdownProps> = props => (
  <div className="markdown-body">
    <ReactMarkdown {...props} renderers={{ code: CodeBlock }}>
      {props.children}
    </ReactMarkdown>
  </div>
)

// https://github.com/rexxars/react-markdown/blob/master/demo/src/demo.js#L61-L69
class CodeBlock extends React.Component<{
  language?: string
  value: string
}> {
  private element!: Node

  public componentDidMount() {
    this.highlightCode()
  }

  public componentDidUpdate() {
    this.highlightCode()
  }

  public render() {
    return (
      <pre>
        <code ref={r => r && (this.element = r)} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }

  private highlightCode() {
    hljs.highlightBlock(this.element)
  }
}

export default Markdown
