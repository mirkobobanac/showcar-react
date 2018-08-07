import React from 'react'

import 'github-markdown-css'
import ReactMarkdown from 'react-markdown'

/**
 * Markdown wrapper that includes github-markdown styles
 */
const Markdown: React.SFC<ReactMarkdown.ReactMarkdownProps> = props => (
  <div className="markdown-body">
    <ReactMarkdown {...props}>{props.children}</ReactMarkdown>
  </div>
)

export default Markdown
