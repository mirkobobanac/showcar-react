import React, { SFC } from 'react'

export type CountryFlags =
  | 'flag/eu'
  | 'flag/de'
  | 'flag/be'
  | 'flag/fr'
  | 'flag/it'
  | 'flag/lu'
  | 'flag/nl'
  | 'flag/es'
  | 'flag/at'

export type BodyType =
  | 'bodytypes/compact'
  | 'bodytypes/delivery'
  | 'bodytypes/electro-hybrid-gas'
  | 'bodytypes/limousine'
  | 'bodytypes/moto-chopper'
  | 'bodytypes/moto-classic'
  | 'bodytypes/moto-enduro'
  | 'bodytypes/moto-naked'
  | 'bodytypes/moto-quad'
  | 'bodytypes/moto-scooter'
  | 'bodytypes/moto-sports'
  | 'bodytypes/moto-tourer'
  | 'bodytypes/moto-touring_enduro'
  | 'bodytypes/offroad'
  | 'bodytypes/oldtimer'
  | 'bodytypes/roadster'
  | 'bodytypes/sports'
  | 'bodytypes/station'
  | 'bodytypes/van'

export type IconTypes =
  | '404'
  | 'android'
  | 'appIcon'
  | 'arrow'
  | 'arrowTop'
  | 'attention'
  | 'auto24'
  | BodyType
  | 'bubble'
  | 'bubbles'
  | 'car-valuation'
  | 'carInsertion'
  | 'carInsertionEdit'
  | 'close'
  | 'contract'
  | 'counselor'
  | 'delete'
  | 'download'
  | 'edit'
  | 'emission-badge-2'
  | 'emission-badge-3'
  | 'emission-badge-4'
  | 'emission-badge-5'
  | 'facebook'
  | 'favorits'
  | 'finance24'
  | CountryFlags
  | 'google'
  | 'googleplus'
  | 'heart'
  | 'hook'
  | 'hookSquare'
  | 'immo24'
  | 'info'
  | 'instagram'
  | 'ios'
  | 'lifestyle/familycar'
  | 'lifestyle/firstcar'
  | 'lifestyle/fourxfour'
  | 'lifestyle/fuelsaver'
  | 'lifestyle/luxury'
  | 'lifestyle/roadster-l'
  | 'location'
  | 'mail'
  | 'navigation/car'
  | 'navigation/caravan'
  | 'navigation/motocycle'
  | 'navigation/truck'
  | 'people'
  | 'phone'
  | 'pin-car-xl'
  | 'pin'
  | 'pinCar'
  | 'pinMoto'
  | 'pinterest'
  | 'placeholder-car'
  | 'placeholder-moto'
  | 'placeholder-truck'
  | 'plus'
  | 'print'
  | 'saved-search'
  | 'scout24'
  | 'search'
  | 'security'
  | 'sharing'
  | 'star-half'
  | 'star'
  | 't-online'
  | 'tip'
  | 'truckscout'
  | 'twitter'
  | 'vehicles'
  | 'whatsapp'
  | 'windows'
  | 'youtube'

// Support custom elements
export interface Props {
  /**
   * icon size
   */
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl'
  type: IconTypes

  /**
   * Event handler
   */
  onClick?: (event: Event) => void

  /**
   * Additional CSS classes
   */
  class?: string

  /**
   * Adding children would break server-side rendering, doesn't make sense anyway since these are
   * external custom components
   */
  children?: never

  /**
   * CSS Styles
   */
  style?: React.CSSProperties

  /**
   * Icon title
   */
  title?: string
}

/**
 * Extend JSX namespace to support custom element
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'as24-icon': Props
    }
  }
}

export const Icon: SFC<Props> = ({ size, type, class: className, onClick, style, title }) => (
  <as24-icon
    class={`sc-icon-${size || 's'} ${className ? className : ''}`}
    type={type}
    title={title}
    onClick={onClick ? onClick : () => {}}
    style={style ? style : {}}
  />
)

export default Icon
