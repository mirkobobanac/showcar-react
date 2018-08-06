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
      <ul>
        {customRenderer !== undefined ? (
          // We wire up the mouseEnter/itemRef on the wrapping element so the custom renderer doesn't have to worry about it
          <li
            key={item.id}
            onMouseEnter={(e: React.MouseEvent<HTMLLIElement>) =>
              mouseEnterRef && mouseEnterRef(item.toJS)(e.currentTarget)
            }
            ref={(r: HTMLLIElement) =>
              !!highlighted && highlighted.id === item.id && r ? highlightedRef(r) : undefined
            }
          >
            {customRenderer({
              item,
              search,
              onClick: () => onClick(item.id),
              selected: !!highlighted && highlighted.id === item.id
            })}
          </li>
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
      </ul>
    ))}
  </div>
)

export default SuggestionByPlainList
