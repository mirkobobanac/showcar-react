import React, { SFC } from 'react'

declare global {
  // Redeclare JSX namespace to support custom elements
  namespace JSX {
    interface IntrinsicElements {
      'as24-notification': any // TODO https://scout24.github.io/showcar-ui/#notification-target
    }
  }
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * defines notification color
   */
  type: 'success' | 'information' | 'error' | 'tip'

  /**
   * notification title
   */
  title: string

  /**
   * whether to show a close button for the notification
   */
  close?: boolean

  /**
   * closes notification after [timeout] ms
   */
  timeout?: number

  /**
   * Whether to show the notification
   */
  enabled: boolean

  /**
   * Callback to run when notification is shown
   */
  onShow?: () => void
}

type State = {
  show: boolean
}

const randomStringId = () => btoa(`${Math.random()}`).substring(0, 12)

/**
 * Notification Component - Shows a notification
 */
class Notification extends React.Component<Props, State> {
  private targetId: string
  private id: string

  constructor(props: Props) {
    super(props)

    this.targetId = randomStringId()
    this.id = randomStringId()

    this.state = {
      show: this.props.enabled
    }
  }

  public shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return nextProps.enabled === false ? false : true
  }

  UNSAFE_componentWillReceiveProps(prevProps: Props) {
    // prevProps.enabled !== this.props.enabled && this.props.enabled && this.forceUpdate()
    // console.log(prevProps, this.props)
    // prevProps.enabled !== this.props.enabled && this.props.enabled && this.props.onShow && this.props.onShow()
  }

  public render() {
    this.props.enabled && this.props.onShow && this.props.onShow()
    return this.props.enabled ? (
      <>
        {/* Notification target */}
        <div id={this.targetId} />
        <as24-notification
          type={this.props.type}
          id={this.props.id}
          target={`#${this.id}`}
          title={this.props.title}
          close={this.props.close !== undefined ? this.props.close : true}
          class={this.state.show ? 'show' : undefined}
          timeout={this.props.timeout}
        >
          {this.props.title}
        </as24-notification>
      </>
    ) : null
  }
}
export default Notification
