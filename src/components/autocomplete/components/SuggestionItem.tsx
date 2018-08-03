import * as React from 'react'

import { IImmutableInput } from '../datatypes/Input'

/**
 * {@link https://stackoverflow.com/questions/2593637/how-to-escape-regular-expression-in-javascript}
 */
const regexQuote = (str: string) => (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')

export const highlightMatches = (s: string, search: string) =>
  s.replace(new RegExp(`(${regexQuote(search)})`, 'ig'), '<strong>$1</strong>')

type IProps<T> = {
  className?: string
  item: IImmutableInput<T>
  onClick: (id: T) => void
  search: string | null
  selected: boolean
  /**
   * Whether to apply match highlighting to search label
   */
  disableMatchHighlighting: boolean
  /**
   * Allows the caller to get a reference of the dom element
   * https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components
   */
  itemRef?: (ref: HTMLLIElement) => void
  onMouseEnter?: (ref: HTMLLIElement) => void
}
const SuggestionItem: React.SFC<IProps<any>> = ({
  item,
  onClick,
  search,
  className,
  selected,
  itemRef,
  onMouseEnter,
  disableMatchHighlighting
}) => (
  <li
    onMouseEnter={(e: React.MouseEvent<HTMLLIElement>) => onMouseEnter && onMouseEnter(e.currentTarget)}
    ref={itemRef}
    className={`${className} ${selected ? 'react-autocomplete__list-item--selected' : ''}`}
    onClick={_ => onClick(item.get('id'))}
  >
    <span
      dangerouslySetInnerHTML={{
        __html: !disableMatchHighlighting && search ? highlightMatches(item.get('label'), search) : item.get('label')
      }}
    />
  </li>
)

export default SuggestionItem
