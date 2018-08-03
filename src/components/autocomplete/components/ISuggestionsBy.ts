import { IImmutableInput, IInput } from '../datatypes/Input'

/**
 * Base interface for all autocomplete suggestion components
 */
export default interface ISuggestionsBy<T, U> {
  data: T
  search: string | null
  highlighted?: IImmutableInput<U>
  disableMatchHighlighting: boolean
  /**
   * A DOM reference to the highlighted item.
   * Note: This runs when mounting the component, so DO NOT cal setState in this callback, it'll lead to infinite loops
   */
  highlightedRef: (ref: HTMLLIElement) => void
  /**
   * A DOM reference triggered when mouse hovers an item
   */
  mouseEnterRef: (item: IInput<U>) => (ref: HTMLLIElement) => void
  suggestionsRef: (ref: HTMLDivElement) => void
  onClick: (id: U) => void
}
