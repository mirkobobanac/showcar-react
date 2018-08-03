import * as React from 'react'

import { equality } from '../datatypes/IBaseType'
import RelationalList, { IImmutableRelationalItem, IImmutableRelationalList } from '../datatypes/RelationalList'
import ISuggestionsBy from './ISuggestionsBy'
import SuggestionItem from './SuggestionItem'

type IProps<T> = ISuggestionsBy<RelationalList<T>, T>

const itemHasParentInList = <T extends {}>(list: IImmutableRelationalList<T>) => (item: IImmutableRelationalItem<T>) =>
  item.parentId !== undefined && list.find(_ => equality(_.id, item.parentId)) !== undefined

const children = <T extends {}>(list: IImmutableRelationalList<T>) => (item: IImmutableRelationalItem<T>) =>
  list.filter(i => equality(i.parentId, item.id))

/**
 * List requirements:
 * - Models belong to modelline should be children if modelline is present
 * - Orphaned models should be idented without a parent
 *
 * Algorithm: We go item by item, and:
 *   - for models that have a parentId present in the list we skip them and collect them back when displaying the modelline
 *   - for models that don't have parent present, we display them indented
 */
export const SuggestionByRelationalList: React.SFC<IProps<any>> = ({
  data: list,
  onClick,
  search,
  highlighted,
  highlightedRef,
  suggestionsRef,
  mouseEnterRef,
  disableMatchHighlighting
}) => (
  <div className="react-autocomplete__list react-autocomplete__list--visible" ref={suggestionsRef}>
    {list.items.filterNot(itemHasParentInList(list.items)).toJs.map(item => (
      <div key={item.id}>
        <SuggestionItem
          item={item}
          search={search}
          className={`react-autocomplete__list-item ${
            item.parentId !== undefined ? 'react-autocomplete__list-item--indented' : ''
          }`}
          selected={!!highlighted && highlighted.id === item.id}
          itemRef={!!highlighted && highlighted.id === item.id ? highlightedRef : undefined}
          onClick={_ => onClick(item.id)}
          onMouseEnter={mouseEnterRef(item.toJS)}
          disableMatchHighlighting={disableMatchHighlighting}
        />
        {/* Optional indented children */}
        {children(list.items)(item).toJs.map(child => (
          <SuggestionItem
            item={child}
            key={`${item.id}-${child.id}`}
            search={search}
            className="react-autocomplete__list-item react-autocomplete__list-item--indented"
            selected={!!highlighted && highlighted.id === child.id}
            itemRef={!!highlighted && highlighted.id === child.id ? highlightedRef : undefined}
            onClick={_ => onClick(child.id)}
            onMouseEnter={mouseEnterRef(child.toJS)}
            disableMatchHighlighting={disableMatchHighlighting}
          />
        ))}
      </div>
    ))}
  </div>
)

export default SuggestionByRelationalList
