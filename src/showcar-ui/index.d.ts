import * as React from 'react'

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
