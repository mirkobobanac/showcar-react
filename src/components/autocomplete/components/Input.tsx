import * as React from 'react'

type IInputProps = {
  id?: string
  placeholder: string
  value: string | undefined
  error: boolean | undefined
  disabled?: boolean
  hideArrow?: boolean
  onChange: (search: string) => void
  onKeyUpArrow: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDownArrow: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyEscape: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void
  onDropdownClick: (inputFocus: () => void) => void
  /**
   * Triggered when the input is reset
   */
  onClearClick: () => void
  blurOnKeyEscape: boolean
}

const Input: React.SFC<IInputProps> = props => {
  let inputRef: HTMLInputElement | null

  const focus = () => inputRef && inputRef.focus()
  const blur = () => inputRef && inputRef.blur()

  return (
    <div className="react-autocomplete__input-wrapper">
      <input
        id={props.id || undefined}
        type="text"
        data-role="user-query"
        className={`react-autocomplete__input ${props.error ? 'error' : ''}`}
        data-ignore="true"
        placeholder={props.placeholder}
        value={props.value}
        ref={input => {
          inputRef = input
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
          switch (e.keyCode) {
            case 27:
              props.onKeyEscape(e)
              if (props.blurOnKeyEscape) {
                blur()
              }
              return
            case 13:
              props.onKeyEnter(e)
              return blur()
            case 38:
              e.preventDefault() // we don't to move input cursor on keypress
              return props.onKeyUpArrow(e)
            case 40:
              e.preventDefault() // we don't to move input cursor on keypress
              return props.onKeyDownArrow(e)
            default:
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
        onClick={props.onClick}
        disabled={props.disabled}
      />

      <div className="react-autocomplete__icon-wrapper">
        {!(props.error || (props.value && props.value.length > 0)) ? (
          <div className="react-autocomplete__icon-dropdown" onClick={() => props.onDropdownClick(focus)}>
            {props.hideArrow !== true && <as24-icon class="react-autocomplete__icon-dropdown__icon" type="arrow" />}
          </div>
        ) : (
          <div
            className="react-autocomplete__icon-cross"
            onClick={() => {
              props.onChange('') // clear input
              focus()
              props.onClearClick()
            }}
          >
            <as24-icon class="react-autocomplete__icon-dropdown__icon" type="close" />
          </div>
        )}
      </div>
    </div>
  )
}
export default Input
