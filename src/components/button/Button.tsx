import React, { SFC } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * Bob: Primary button, should be used for all top level interactions.
   * Ross: Secondary button, should be used for less important interactions.
   * Ghost: Use it for data-driven actions e.g. show phone number on desktop.
   * Marketing: Use for marketing purposes e.g. banner ads from the marketing department.
   */
  type: 'bob' | 'ross' | 'ghost' | 'marketing'

  /**
   * whether to render the button as a link
   */
  link?: boolean

  /**
   * Does nothing when `link` is true
   */
  disabled?: boolean

  /**
   *  Make button be full width
   */

  fullWidth?: boolean
}

/**
 * Button Component - supports all standard <button> attributes plus showcar-specific ones
 */
export const Button: SFC<Props> = props => {
  const { link, type, className, children, fullWidth, disabled, ...standardHtmlButtonAttributes } = props

  return link ? (
    <a
      className={`sc-btn-${type} ${className ? className : ''} ${fullWidth ? 'sc-btn-block' : ''}`}
      {...standardHtmlButtonAttributes}
    >
      {children}
    </a>
  ) : (
    <button
      className={`sc-btn-${type} ${className ? className : ''} ${fullWidth ? 'sc-btn-block' : ''}`}
      disabled={disabled || false}
      {...standardHtmlButtonAttributes}
    >
      {children}
    </button>
  )
}

export default Button
