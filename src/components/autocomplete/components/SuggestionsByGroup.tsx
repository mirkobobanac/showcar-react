import * as React from 'react'

import Groups, { IImmutableGroups } from '../datatypes/Groups'
import { equality } from '../datatypes/IBaseType'
import { IImmutableInput, IInput } from '../datatypes/Input'
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
    {groups.items.filter(group => group.get('items').size > 0).map(group => (
      <div key={group.get('label')}>
        <div className="react-autocomplete__list-item react-autocomplete__separator">{group.get('label')}</div>
        {group
          .get('items')
          .map(item => (
            <SuggestionItem
              item={item}
              key={`${group.get('label')}_${item.get('id')}`}
              search={search}
              className="react-autocomplete__list-item"
              selected={!!highlighted && equality(highlighted.get('id'), item.get('id'))}
              itemRef={!!highlighted && equality(highlighted.get('id'), item.get('id')) ? highlightedRef : undefined}
              onClick={_ => onClick(item.get('id'))}
              onMouseEnter={mouseEnterRef(item.toJS)}
              disableMatchHighlighting={disableMatchHighlighting}
            />
          ))}
      </div>
    ))}
  </div>
)

export default SuggestionsByGroup
