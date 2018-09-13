import * as React from 'react';
import './LightBox.scss'

export type LightBoxResultType = 'error' | 'success'

interface ILightBoxProps {
  /**
   * Control displaying of LightBox by external attribute
   */
  isShow: boolean
  /**
   *  Class Name to be used for whole LighBox content with close button and messages (top level)
   */
  className?: string
  /**
   *  Class Name to be used as replacement for "react-light-box__content"
   */
  contentClassName?: string
  /**
   * Flag to enable loging indicator within LightBox (so far you could close LigbBox by clicking outside)
   */
  isLoading?: boolean
  /**
   * Add child components
   */
  children?: any
  /**
   * Flag to disable closign by clicking outside
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
  resultType?: LightBoxResultType
}

interface ILightBoxState {
  isLoading: boolean
}

export class LightBoxClass extends React.Component<ILightBoxProps, ILightBoxState> {
  public state: ILightBoxState = {
    isLoading: this.props.isLoading || false
  }

  public render() {
    const { isLoading } = this.state
    const { children, isShow, className, contentClassName, resultMessage } = this.props;
    let { resultType } = this.props;

    resultType = resultType || 'success';

    const closeLightBox = this.closeLightBox.bind(this);
    const overlayCloseLightBox = this.overlayCloseLightBox.bind(this);

    if (!isShow) {
      return null;
    }

    return (
      <div
        className="react-light-box__overlay react-light-box__overlay--visible react-light-box--fadein"
        onClick={overlayCloseLightBox}
      >
        <div className={className || ''}>
          <div className="react-light-box__container react-light-box__container--visible ">
            {resultMessage ? (
              <div
                className={"react-light-box__container__message react-light-box__container__message-" + resultType}>
                <span className="sc-font-m sc-font-bold">{resultMessage}</span>
              </div>
            ) : null}
            {isLoading && (
              <div className="react-light-box__spinner">
                <div className="sc-spinner-loading orange"/>
              </div>
            )}
            <button className="react-light-box__close" onClick={closeLightBox}>
              <as24-icon type="close"/>
            </button>
            <div className={contentClassName || 'react-light-box__content'}>{children}</div>
          </div>
        </div>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps: Readonly<ILightBoxProps>) {
    this.setState({
      isLoading: nextProps.isLoading || false
    })
  }

  private closeLightBox(e: any) {
    // ensure click on target element only. Overlay capture all internal clicks !
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      if(this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  private overlayCloseLightBox(e: any) {
    if (!this.props.ignoreOverlayClickClose) {
      this.closeLightBox(e);
    }
  }
}

export const LightBox = LightBoxClass
