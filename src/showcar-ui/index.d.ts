import * as React from 'react'

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
  | 'flag/eu'

export type BodyTypeIcons =
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

export type CheckboxColors =
  | 'black'
  | 'grey'
  | 'silver'
  | 'white'
  | 'red'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'beige'
  | 'gold'
  | 'brown'
  | 'orange'
  | 'bronze'
  | 'violet'
  | 'other'

// Support custom elements
interface As24IconProps {
  type:
    | '404'
    | 'android'
    | 'appIcon'
    | 'arrow'
    | 'arrowTop'
    | 'attention'
    | 'auto24'
    | BodyTypeIcons
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
  onClick?: (event: Event) => void
  class?: string
  /**
   * Adding children would break server-side rendering, doesn't make sense anyway since these are
   * external custom components
   */
  children?: never
  style?: React.CSSProperties
}

type As24Tooltip = {
  class: 'sc-tooltip'
}

type As24Lightbox = {
  id: string
}

type As24Footnotes = {
  class?: string
}

type As24AdSlotComponent = {
  /**
   * Refresh ad slot
   */
  refreshAdSlot?: () => void
} & Element

interface CustomDropdownProps {
  checkboxgroup: string
  class?: string
  tabindex: string
  closeonselect: string
}

declare global {
  // Tracking-related global variables
  interface Window {
    S24_OSA?: any
    ut?: any[]
    dataLayer?: any[]
    google_tag_manager?: any
    Pager?: new (
      root: HTMLElement | string,
      itemsPerPage: number,
      activePage: number,
      totalItems: number,
      urlTemplate: string,
      unlimited: boolean
    ) => {}
  }
  // Redeclare JSX namespace to support custom elements
  namespace JSX {
    interface IntrinsicElements {
      // [elemName: string]: any;
      'as24-icon': As24IconProps
      'as24-tooltip': As24Tooltip
      'custom-dropdown': CustomDropdownProps
      'as24-lightbox': As24Lightbox
      's24-ad-slot': As24AdSlotComponent
      'as24-footnotes': As24Footnotes
    }
  }
}
