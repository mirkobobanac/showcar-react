import * as React from 'react'

import Groups from '../datatypes/Groups'
import { equality } from '../datatypes/IBaseType'
import ISuggestionsBy from './ISuggestionsBy'
import SuggestionItem from './SuggestionItem'

type IProps<T> = ISuggestionsBy<Groups<T>, T>

export const SuggestionsByGroup: React.SFC<IProps<any>> = ({
  data: groups,
  onClick,
  search,
  highlighted,
  highlightedRef,
  suggestionsRef,
  mouseEnterRef,
  disableMatchHighlighting
}) => (
  <div
    className="as24-grouped-suggestions-list react-autocomplete__list react-autocomplete__list--visible"
    ref={suggestionsRef}
  >
    {groups.items.filter(group => group.items.size > 0).toJs.map(group => (
      <div key={group.label}>
        <div className="react-autocomplete__list-item react-autocomplete__separator">{group.label}</div>
        {group.items.toJs.map(item => (
          <SuggestionItem
            item={item}
            key={`${group.label}_${item.id}`}
            search={search}
            className="react-autocomplete__list-item"
            selected={!!highlighted && equality(highlighted.id, item.id)}
            itemRef={!!highlighted && equality(highlighted.id, item.id) ? highlightedRef : undefined}
            onClick={_ => onClick(item.id)}
            onMouseEnter={mouseEnterRef(item.toJS)}
            disableMatchHighlighting={disableMatchHighlighting}
          />
        ))}
      </div>
    ))}
  </div>
)

export default SuggestionsByGroup
