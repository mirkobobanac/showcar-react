import React from 'react'

import ReactMarkdown from 'react-markdown'
import '../../node_modules/github-markdown-css/github-markdown.css' // include css instead of regular JS include because Jest breaks otherwise

/**
 * Markdown wrapper that includes github-markdown styles
 */
const Markdown: React.SFC<ReactMarkdown.ReactMarkdownProps> = props => (
  <div className="markdown-body">
    <ReactMarkdown {...props}>{props.children}</ReactMarkdown>
  </div>
)

export default Markdown
