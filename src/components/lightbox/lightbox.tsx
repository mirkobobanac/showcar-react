import * as React from 'react'
import './lightbox.scss'

export type LightboxResultType = 'error' | 'success'

interface ILightboxProps {
  /**
   * Control displaying of Lightbox by external attribute
   */
  shown: boolean
  /**
   *  Class Name to be used for whole LighBox content with close button and messages (top level)
   */
  className?: string
  /**
   *  Class Name to be used as replacement for "react-light-box__content"
   */
  contentClassName?: string
  /**
   * Flag to enable loading indicator within Lightbox (so far you could close LigbBox by clicking outside)
   */
  isLoading?: boolean
  /**
   * Flag to disable closing by clicking outside
   */
  ignoreOverlayClickClose?: boolean
  /**
   * Triggered for close icon clicks and outside clicks
   */
  onClose?: () => void
  /**
   * Displayed resulting message
   */
  resultMessage?: string
  /**
   * TYpe of resulting message to display
   */
  resultType?: LightboxResultType
}

interface ILightboxState {
  isLoading: boolean
}

export class LightboxClass extends React.Component<ILightboxProps, ILightboxState> {
  public state: ILightboxState = {
    isLoading: this.props.isLoading || false
  }

  public render() {
    const { isLoading } = this.state
    const { children, shown, className, contentClassName, resultMessage } = this.props
    let { resultType } = this.props

    resultType = resultType || 'success'

    return shown ? (
      <div
        className="react-light-box__overlay react-light-box__overlay--visible react-light-box--fadein"
        onClick={e => this.overlayCloseLightbox(e)}
      >
        <div className={className || ''}>
          <div className="react-light-box__container react-light-box__container--visible ">
            {resultMessage ? (
              <div className={'react-light-box__container__message react-light-box__container__message-' + resultType}>
                <span className="sc-font-m sc-font-bold">{resultMessage}</span>
              </div>
            ) : null}
            {isLoading && (
              <div className="react-light-box__spinner">
                <div className="sc-spinner-loading orange" />
              </div>
            )}
            <button className="react-light-box__close" onClick={e => this.closeLightbox(e)}>
              <as24-icon type="close" />
            </button>
            <div className={contentClassName || 'react-light-box__content'}>{children}</div>
          </div>
        </div>
      </div>
    ) : null
  }

  public componentWillReceiveProps(nextProps: Readonly<ILightboxProps>) {
    this.setState({
      isLoading: nextProps.isLoading || false
    })
  }

  private closeLightbox(e: any) {
    // ensure click on target element only. Overlay capture all internal clicks !
    if (e.target === e.currentTarget) {
      e.preventDefault()
      e.stopPropagation()
      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }

  private overlayCloseLightbox(e: any) {
    if (!this.props.ignoreOverlayClickClose) {
      this.closeLightbox(e)
    }
  }
}

export const Lightbox = LightboxClass
