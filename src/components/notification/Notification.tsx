import React, { SFC } from 'react'
import { clearInterval } from 'timers'

declare global {
  // Redeclare JSX namespace to support custom elements
  namespace JSX {
    interface IntrinsicElements {
      'as24-notification': any // TODO https://scout24.github.io/showcar-ui/#notification-target
    }
  }
}

interface Props {
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
  // timeout?: number

  /**
   * Callback to run when notification is closed
   */
  onClose?: () => void
}

const randomStringId = () => btoa(`${Math.random()}`).substring(0, 12)

/**
 * Frequency with which we poll the custom element to determine if it's shown or not
 */
const intervalCheckFrequency = 100

/**
 * Notification Component - Shows a notification
 */
export class Notification extends React.Component<Props> {
  private isShownCronCheck: number | null = null
  private targetId: string
  private id: string
  private autocompleteRef: HTMLElement | null = null

  constructor(props: Props) {
    super(props)

    this.targetId = randomStringId()
    this.id = randomStringId()
  }

  componentDidMount() {
    this.isShownCronCheck = window.setInterval(() => {
      if (this.autocompleteRef && !this.autocompleteRef.classList.contains('show') && this.props.onClose) {
        this.props.onClose()
      }
    }, intervalCheckFrequency)
  }

  componentWillUnmount() {
    if (this.isShownCronCheck !== null) {
      window.clearInterval(this.isShownCronCheck)
    }
  }

  public render() {
    return (
      <div
        ref={ref => {
          ref && ref.children[1] && (this.autocompleteRef = ref.children[1] as HTMLElement)
        }}
      >
        {/* Notification target */}
        <div id={this.targetId} />
        <as24-notification
          type={this.props.type}
          id={this.id}
          target={`#${this.id}`}
          title={this.props.title}
          {...(this.props.close ? { close: true } : {})}
          class="show"
          // timeout={`${this.props.timeout}`}
        >
          {this.props.children || undefined}
        </as24-notification>
      </div>
    )
  }
}
export default Notification
