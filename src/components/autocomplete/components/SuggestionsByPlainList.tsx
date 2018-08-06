import * as React from 'react'

import PlainList, { CustomeRenderer } from '../datatypes/PlainList'
import ISuggestionsBy from './ISuggestionsBy'
import SuggestionItem from './SuggestionItem'

type IProps<T> = ISuggestionsBy<PlainList<T>, T> & {
  customRenderer?: CustomeRenderer<T>
}

export const SuggestionByPlainList: React.SFC<IProps<any>> = ({
  data: list,
  onClick,
  search,
  highlighted,
  highlightedRef,
  mouseEnterRef,
  suggestionsRef,
  disableMatchHighlighting,
  customRenderer
}) => (
  <div className="react-autocomplete__list react-autocomplete__list--visible" ref={suggestionsRef}>
    {list.items.toJs.map(item => (
      <div key={item.id}>
        {customRenderer !== undefined ? (
          customRenderer({
            item,
            onClick: () => onClick(item.id),
            // mouseEnterRef(item.toJS),
            selected: !!highlighted && highlighted.id === item.id,
            search
          })
        ) : (
          <SuggestionItem
            item={item}
            search={search}
            className="react-autocomplete__list-item"
            selected={!!highlighted && highlighted.id === item.id}
            itemRef={!!highlighted && highlighted.id === item.id ? highlightedRef : undefined}
            onClick={_ => onClick(item.id)}
            onMouseEnter={mouseEnterRef(item.toJS)}
            disableMatchHighlighting={disableMatchHighlighting}
          />
        )}
      </div>
    ))}
  </div>
)

export default SuggestionByPlainList
