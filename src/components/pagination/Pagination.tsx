import * as React from 'react'
import { Dispatch } from 'redux'

type Props = {
  /**
   * number of items per page
   */
  pageSize: number

  /**
   * current selected page
   */
  currentPage: number

  /**
   * total number of items
   */
  totalItems: number

  /**
   * Text to use for the prev/next buttons
   */
  messages: {
    next: string
    previous: string
  }

  /**
   * Callback to trigger when a page is selected
   */
  onPageSelection: (page: number, url: string) => void

  /**
   * url template where pagination will be injected. Must have placeholder `&page={page}`
   */
  urlTemplate: string

  /**
   * Due to underlying showcar-ui, there is a chance the pagination fails to build. This callback will receive the error in such cases
   */
  onCreationError?: (e: Error) => void

  /**
   * Whether to scroll to the top of the page upon page change. Defaults to false
   */
  autoScrollToTop?: boolean
}

/**
 * Pagination component
 */
class Pagination extends React.Component<Props> {
  private paginationElement!: HTMLElement // assigned on render

  public render() {
    return (
      <div className="cl-pagination">
        <ul
          className="sc-pagination"
          ref={r => r && (this.paginationElement = r)}
          data-previous-text={this.props.messages.previous}
          data-next-text={this.props.messages.next}
        />
      </div>
    )
  }

  public componentDidMount() {
    this.updatePager()
  }

  /**
   * TODO: Refactor to not use componentWillReceiveProps
   */
  public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
    if (this.props !== nextProps) {
      this.updatePager()
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.pageSize !== this.props.pageSize ||
      prevProps.currentPage !== this.props.currentPage ||
      prevProps.totalItems !== this.props.totalItems ||
      prevProps.urlTemplate !== this.props.urlTemplate ||
      prevProps.messages !== this.props.messages ||
      prevProps.urlTemplate !== this.props.urlTemplate ||
      prevProps.autoScrollToTop !== this.props.autoScrollToTop
    ) {
      this.updatePager()
    }

    if (prevProps.currentPage !== this.props.currentPage && this.props.autoScrollToTop) {
      this.focusTop()
    }
  }

  private focusTop() {
    window.scrollTo(0, 0)
  }

  private updatePager() {
    if (this.paginationElement && window.Pager) {
      try {
        // tslint:disable-next-line:no-unused-expression
        new window.Pager(
          this.paginationElement,
          this.props.pageSize,
          this.props.currentPage,
          this.props.totalItems,
          this.props.urlTemplate,
          false
        )
      } catch (e) {
        this.props.onCreationError && this.props.onCreationError(e)
      }
    }

    Array.from(this.paginationElement.getElementsByTagName('a'))
      .map(elem => ({
        elem,
        url: elem.getAttribute('href')
      }))
      .map(elementAndUrl => ({
        elem: elementAndUrl.elem,
        page: elementAndUrl.url ? extractIntParamNumberFromUrl(elementAndUrl.url)('page') : null
      }))
      .forEach(data => {
        data.elem.onclick = (ev: MouseEvent) => {
          ev.preventDefault()
          // console.log(data)
          if (data.page !== null && data.page !== 0 && !isNaN(data.page)) {
            // console.log('triggering page selection', this.props.onPageSelection)
            this.props.onPageSelection(data.page, data.elem.getAttribute('href')!)
          }
        }
      })
  }
}

export const extractIntParamNumberFromUrl = (url: string) => (param: string): number | null => {
  const parts = url.split(`&${param}=`).length > 1 ? url.split(`&${param}=`) : url.split(`?${param}=`)

  if (parts.length > 1) {
    const n = Number(parts[1].split('&')[0])
    return !isNaN(n) ? n : null
  } else {
    return null
  }
}

export default Pagination
