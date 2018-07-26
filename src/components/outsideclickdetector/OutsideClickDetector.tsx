import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClickOutside: () => void
}

/**
 * Component that alerts if you click outside of it
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component#answer-42234988
 *
 * Logic: Binds an event listener to the top document that checks every mousedown to see if it comes from
 * a dom element inside this container or not. If it doesn't, it triggers the `onClickOutside` callback
 */
class OutsideClickDetector extends React.Component<Props> {
  public wrapperRef!: HTMLDivElement | null // set on render

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('touchstart', this.handleClickOutside)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    document.removeEventListener('touchstart', this.handleClickOutside)
  }

  public setWrapperRef = (node: HTMLDivElement) => (this.wrapperRef = node)

  public handleClickOutside = (event: Event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target as any)) {
      this.props.onClickOutside()
    }
  }

  public render() {
    const { onClickOutside, ...standardHtmlDivAttributes } = this.props

    return (
      <div {...standardHtmlDivAttributes} ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    )
  }
}

export default OutsideClickDetector
