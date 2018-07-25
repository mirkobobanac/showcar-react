import React from 'react'

type Props = {
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
   * Additional classes
   */
  additionalClasses?: string

  // Make button be full width
  fullWidth?: boolean
}

/**
 * Button Component
 */
export const Button: React.SFC<Props> = ({ link, type, additionalClasses, children, fullWidth, disabled }) =>
  link ? (
    <a className={`sc-btn-${type} ${additionalClasses ? additionalClasses : ''} ${fullWidth} ? 'sc-btn-block' : ''}`}>
      {children}
    </a>
  ) : (
    <button
      className={`sc-btn-${type} ${additionalClasses ? additionalClasses : ''} ${fullWidth} ? 'sc-btn-block' : ''}`}
      disabled={disabled || false}
    >
      {children}
    </button>
  )

export default Button
