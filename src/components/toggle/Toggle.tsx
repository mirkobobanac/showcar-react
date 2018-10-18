import * as React from 'react'

import './toggle.scss'

interface IProps {
  checked: boolean
  handleChange: ((toggled: boolean) => void)
  async?: boolean
  isLoading?: boolean
  active?: boolean
}

interface IState {
  checked: boolean
  isLoading: boolean
  async: boolean
}

class ToggleComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      checked: props.checked,
      isLoading: props.isLoading === undefined ? false : props.isLoading,
      async: props.async === undefined ? false : props.async
    }
  }

  public render() {
    return (
      <div>
        <input
          type="checkbox"
          id="switched-on"
          className="sc-toggle-checkbox"
          checked={this.state.checked}
          onChange={this.handleToggling}
        />
        <label className={this.getToggleState()} htmlFor="switched-on">
          <div className="sc-toggle-background">
            <as24-icon type="hook" />
          </div>
        </label>
      </div>
    )
  }

  private handleToggling = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.state.isLoading) {
      const checked = event.target.checked
      this.props.handleChange(checked)
      if (this.state.async) {
        this.setState({ checked, isLoading: true })
      } else {
        this.setState({ checked })
      }
    }
  }

  private getToggleState = () => {
    const baseClass = 'sc-toggle'
    return this.state.isLoading ? `${baseClass} scr-toggle-loading` : baseClass
  }
}

export { ToggleComponent }
