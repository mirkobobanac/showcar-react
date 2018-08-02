import * as React from 'react'
import OutsideClickDetector from '../outsideclickdetector/OutsideClickDetector'
import Input from './components/Input'
import SuggestionsByGroup from './components/SuggestionsByGroup'
import SuggestionByPlainList from './components/SuggestionsByPlainList'
import SuggestionByRelationalList from './components/SuggestionsByRelationalList'
import Groups, { IGroupedData } from './datatypes/Groups'
import { IInput } from './datatypes/Input'
import PlainList, { IPlainListData } from './datatypes/PlainList'
import RelationalList, { IRelationalListData } from './datatypes/RelationalList'

// CSS styles
import './autocomplete.scss'

type IDataSource<T> = IGroupedData<T> | IRelationalListData<T> | IPlainListData<T>

type IProps<T> = {
  source: IDataSource<T>
  selected: IInput<T> | null
  onChange?: (search: string) => void
  onSelect: (t: IInput<T> | null | undefined) => void
  disabled?: boolean
  placeholder: string
  suppressErrors?: boolean
  errorMessage: string
  hideArrow?: boolean
}

type IState<T> = {
  search: string | null
  showList: boolean
  /**
   * Whether we should actually filter the results or not.
   */
  filter: boolean
  /**
   * The element position that is currently being highlighted
   */
  highlighted: number

  items: Groups<T> | RelationalList<T> | PlainList<T>
  lastSelected: IInput<T> | null
  lastSourceData: IDataSource<T>['data']
}

function assertNever(x: never): never {
  throw new Error('Missing data type case: ' + x)
}

class Autocomplete<T> extends React.Component<IProps<T>, IState<T>> {
  /**
   * DOM references. We put this outside the react state because they are not linked to visual changes inside React.
   * They are used for DOM scrolling which is done outside of React.
   */
  private highlightedElement!: HTMLLIElement | null
  private suggestionsContainerElement!: HTMLDivElement | null

  /* tslint:disable:member-ordering */
  constructor(props: IProps<T>) {
    super(props)
    const items = Autocomplete.buildItems(props.source)
    const highlighted = items.indexById(props.selected && props.selected.id)

    this.state = {
      search: this.searchFromCurrentSelection(props),
      showList: false,
      filter: false,
      highlighted: highlighted !== -1 ? highlighted : 0,
      items,
      lastSelected: null,
      lastSourceData: []
    }
  }

  /**
   * Every time the component is updated from outside (new props), we will synchronize
   * - The current search to match it
   * - The internal item hydrated list
   */
  public static getDerivedStateFromProps<T>(nextProps: Readonly<IProps<T>>, prevState: IState<T>) {
    const selectionState = prevState.lastSelected !== nextProps.selected && {
      search: (nextProps.selected && nextProps.selected.label) || null,
      lastSelected: nextProps.selected
    }

    if (prevState.lastSourceData !== nextProps.source.data) {
      // Update items list whenever we get new source data
      const items = Autocomplete.buildItems(nextProps.source)
      // we are on filtering and new data is coming
      const sourceState = prevState.filter
        ? {
            items,
            showList: !items.filter(prevState.search).isEmpty(),
            lastSourceData: nextProps.source.data
          }
        : { items, lastSourceData: nextProps.source.data }

      return selectionState ? { ...selectionState, ...sourceState } : sourceState
    } else {
      return selectionState || null
    }
  }

  private static buildItems = <T extends {}>(
    source: IProps<T>['source']
  ): Groups<T> | RelationalList<T> | PlainList<T> => {
    // Build source based on type
    switch (source.type) {
      case 'grouped':
        return new Groups(source.data)
      case 'relationalList':
        return new RelationalList(source.data)
      case 'plainList':
        return new PlainList(source.data)
      default:
        return assertNever(source)
    }
  }

  private searchFromCurrentSelection = (props: IProps<T>) => (props.selected && props.selected.label) || null

  /**
   * Gets called every time we want to "close" the component
   * Because of outside click detection, this will get called everytime there is a click on the page outside of this component
   */
  private closeComponent = (callback?: () => void) =>
    this.setState(
      (_prevState, props) => ({
        showList: false,
        filter: false, // next time we refocus the input, we will start unfiltered
        search: this.searchFromCurrentSelection(props)
      }),
      callback
    )

  private handleSelectedItem = (id: T) =>
    this.closeComponent(() => {
      const selected = this.state.items.itemById(id)
      selected && this.props.onSelect(selected.toJS)
    })

  private readonly clear = {
    search: () =>
      this.setState({
        search: null
      }),

    selectedItem: () => this.props.selected && this.props.onSelect(null)
  }

  private toggleList = (inputFocus: () => void) => {
    if (this.state.showList) {
      this.setState({
        showList: false
      })
    } else {
      this.setState({
        showList: true
      })
      inputFocus()
    }
  }

  /**
   * Highlighted handlers
   */
  private readonly highlighted = {
    /**
     * TODO: This should be rewritten with a more complex logic that detects if the target element is currently in the visible dropdown viewport:
     *  - If it is visible, we don't do anything (so no scrolling unless we are at the top or bottom edges)
     *  - If it's hidden, scroll up or down so it's visible again
     */
    scrollToHighlighted: (reverseDirection: boolean = false) =>
      this.suggestionsContainerElement &&
      this.highlightedElement &&
      (this.suggestionsContainerElement.scrollTop = this.highlightedElement.offsetTop - (reverseDirection ? 250 : 220)), // TODO: Compute this # properly instead of magic numbers

    setHighlightedAsSelected: () => {
      const item = this.state.items
        .filter(this.state.filter ? this.state.search : null)
        .itemByIndex(this.state.highlighted)
      item && this.handleSelectedItem(item.get('id'))
    },

    shiftHighlighted: (positions: number) => (_: React.KeyboardEvent<HTMLInputElement>) =>
      this.setState(state => ({
        highlighted:
          positions <= 0
            ? Math.max(0, state.highlighted + positions)
            : Math.min(state.items.size - 1, state.highlighted + positions)
      })),

    setHighlightedRef: (ref: HTMLLIElement) => {
      this.highlightedElement = ref
    },

    setHighlighted: (item: IInput<T>) => (ref: HTMLLIElement) => {
      this.highlighted.setHighlightedRef(ref)

      this.setState((prevState, _props) => {
        const highlighted = prevState.items.filter(prevState.filter ? prevState.search : null).indexById(item.id)
        return {
          highlighted: highlighted !== -1 ? highlighted : 0
        }
      })
    },

    setSuggestionsContainerElement: (ref: HTMLDivElement) => (this.suggestionsContainerElement = ref)
  }

  private previousHighlighted = this.highlighted.shiftHighlighted(-1)

  private nextHighlighted = this.highlighted.shiftHighlighted(1)

  /**
   * Input handlers
   */
  private readonly input = {
    onChange: (showList: boolean) => (search: string) => {
      this.setState({
        search,
        filter: true, // after any input changes, we start filtering the results
        showList,
        highlighted: 0 // reset highlighted item to the first
      })
      this.props.onChange && this.props.onChange(search)
      if (search.length === 0) {
        this.clear.selectedItem()
      }
    },
    onClick: (_: React.MouseEvent<HTMLInputElement>) =>
      this.setState<'showList' & ('showlist' | 'highlighted')>(
        (_prevState, props) => {
          const highlighted = props.selected ? _prevState.items.indexById(props.selected.id) : 0
          return Object.assign(
            {
              showList: true
            },
            // For the case where we are opening the list, we compute the highlighted position. This has advantages
            // compared to doing it at close time (some cases are not caught that way)
            !_prevState.showList
              ? {
                  highlighted: highlighted !== -1 ? highlighted : 0
                }
              : {}
          )
        },
        this.highlighted.scrollToHighlighted // this needs to come after the suggestions list has been opened so the DOM ref is available to scroll
      ),
    onKeyEscape: (_: React.KeyboardEvent<HTMLInputElement>) => {
      if (this.state.search && this.state.search.length > 0) {
        this.clear.search()
        this.clear.selectedItem()
      } else {
        this.closeComponent()
      }
    },
    onKeyUpArrow: (e: React.KeyboardEvent<HTMLInputElement>) => {
      this.previousHighlighted(e)
      this.highlighted.scrollToHighlighted(true)
    },
    onKeyDownArrow: (e: React.KeyboardEvent<HTMLInputElement>) => {
      this.nextHighlighted(e)
      this.highlighted.scrollToHighlighted()
    }
  }

  public render() {
    const filtered = this.state.items.filter(this.state.filter ? this.state.search : null)
    const highlighted = filtered.itemByIndex(this.state.highlighted)
    const error =
      (this.props.suppressErrors === undefined || !this.props.suppressErrors) &&
      !!(this.state.search && this.state.search.length > 0 && filtered.isEmpty())
    const disableMatchHighlighting = !this.state.filter

    return (
      <OutsideClickDetector className="react-autocomplete" onClickOutside={this.closeComponent}>
        <div className="react-autocomplete__input-wrapper">
          <Input
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            error={error || undefined}
            value={this.state.search || ''}
            onChange={this.input.onChange(!filtered.isEmpty())}
            onClick={this.input.onClick}
            onKeyEnter={this.highlighted.setHighlightedAsSelected}
            onKeyEscape={this.input.onKeyEscape}
            onKeyUpArrow={this.input.onKeyUpArrow}
            onKeyDownArrow={this.input.onKeyDownArrow}
            onClearClick={this.clear.selectedItem}
            onDropdownClick={this.toggleList}
            blurOnKeyEscape={this.state.search === null || this.state.search.length === 0}
            hideArrow={this.props.hideArrow}
          />
        </div>

        {/* Suggestions */}
        {this.state.showList &&
          !filtered.isEmpty() &&
          // Grouped suggestions
          ((this.props.source.type === 'grouped' && (
            <SuggestionsByGroup
              data={filtered as Groups<T>}
              search={this.state.search}
              onClick={this.handleSelectedItem}
              highlighted={highlighted}
              highlightedRef={this.highlighted.setHighlightedRef}
              mouseEnterRef={this.highlighted.setHighlighted}
              suggestionsRef={this.highlighted.setSuggestionsContainerElement}
              disableMatchHighlighting={disableMatchHighlighting}
            />
          )) ||
            // Relational list suggestions
            (this.props.source.type === 'plainList' && (
              <SuggestionByPlainList
                data={filtered as PlainList<T>}
                search={this.state.search}
                onClick={this.handleSelectedItem}
                highlighted={highlighted}
                highlightedRef={this.highlighted.setHighlightedRef}
                mouseEnterRef={this.highlighted.setHighlighted}
                suggestionsRef={this.highlighted.setSuggestionsContainerElement}
                disableMatchHighlighting={disableMatchHighlighting}
              />
            )) ||
            // Relational list suggestions
            (this.props.source.type === 'relationalList' && (
              <SuggestionByRelationalList
                data={filtered as RelationalList<T>}
                search={this.state.search}
                onClick={this.handleSelectedItem}
                highlighted={highlighted}
                highlightedRef={this.highlighted.setHighlightedRef}
                mouseEnterRef={this.highlighted.setHighlighted}
                suggestionsRef={this.highlighted.setSuggestionsContainerElement}
                disableMatchHighlighting={disableMatchHighlighting}
              />
            )))}

        {/* Optional error message */}
        {error && (
          <div className="react-autocomplete__list react-autocomplete__list--visible">
            <li className="react-autocomplete__list-item react-autocomplete__list-item react-autocomplete__list-item--empty react-autocomplete__list-item--selected">
              {this.props.errorMessage}
            </li>
          </div>
        )}
      </OutsideClickDetector>
    )
  }
}

export default Autocomplete
