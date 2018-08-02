import * as React from 'react'

import PlainList from '../datatypes/PlainList'
import ISuggestionsBy from './ISuggestionsBy'
import SuggestionItem from './SuggestionItem'

type IProps<T> = ISuggestionsBy<PlainList<T>, T>

export const SuggestionByPlainList: React.SFC<IProps<any>> = ({
  data: list,
  onClick,
  search,
  highlighted,
  highlightedRef,
  mouseEnterRef,
  suggestionsRef,
  disableMatchHighlighting
}) => (
  <div className="react-autocomplete__list react-autocomplete__list--visible" ref={suggestionsRef}>
    {list.items.map(item => (
      <div key={item.get('id')}>
        <SuggestionItem
          item={item}
          search={search}
          className="react-autocomplete__list-item"
          selected={!!highlighted && highlighted.get('id') === item.get('id')}
          itemRef={!!highlighted && highlighted.get('id') === item.get('id') ? highlightedRef : undefined}
          onClick={_ => onClick(item.get('id'))}
          onMouseEnter={mouseEnterRef(item.toJS)}
          disableMatchHighlighting={disableMatchHighlighting}
        />
      </div>
    ))}
  </div>
)

export default SuggestionByPlainList
