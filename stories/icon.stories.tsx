import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs'
import { Icon, Props as IconProps, IconTypes } from '../src/components/icon/Icon'

storiesOf('Core|Atoms/Icon', module)
  .addDecorator(withKnobs)
  .add('icons', () => (
    <div>
      {allIconTypes.map(iconType => (
        <div
          style={{
            display: 'inline-block',
            margin: '0.5em',
            border: '1px solid #666',
            padding: '0.5em',
            borderRadius: '0.3em',
            backgroundColor: select(
              'backgroundColorTest',
              { white: 'white', orange: 'orange', grey: '#666', transparent: 'transparent' },
              'transparent'
            )
          }}
        >
          <Icon
            type={iconType}
            onClick={action(`clicked on icon ${iconType}, receiving event`)}
            title={iconType}
            size={select('size', sizeOptions, sizeOptions.xl) as any}
          />
        </div>
      ))}
    </div>
  ))
  .addDecorator(withInfo({ inline: true, header: false, source: false })(() => <Icon type="android" size="xl" />))
  .add('usage', () => <div />)

const sizeOptions = {
  s: 'small',
  m: 'medium',
  l: 'large',
  xl: 'xl',
  xxl: 'xxl'
}

const allIconTypes: IconTypes[] = [
  'bodytypes/compact',
  'bodytypes/delivery',
  'bodytypes/electro-hybrid-gas',
  'bodytypes/limousine',
  'bodytypes/moto-chopper',
  'bodytypes/moto-classic',
  'bodytypes/moto-enduro',
  'bodytypes/moto-naked',
  'bodytypes/moto-quad',
  'bodytypes/moto-scooter',
  'bodytypes/moto-sports',
  'bodytypes/moto-tourer',
  'bodytypes/moto-touring_enduro',
  'bodytypes/offroad',
  'bodytypes/oldtimer',
  'bodytypes/roadster',
  'bodytypes/sports',
  'bodytypes/station',
  'bodytypes/van',
  '404',
  'android',
  'appIcon',
  'arrow',
  'arrowTop',
  'attention',
  'auto24',
  'bubble',
  'bubbles',
  'car-valuation',
  'carInsertion',
  'carInsertionEdit',
  'close',
  'contract',
  'counselor',
  'delete',
  'download',
  'edit',
  'emission-badge-2',
  'emission-badge-3',
  'emission-badge-4',
  'emission-badge-5',
  'facebook',
  'favorits',
  'finance24',
  'flag/eu',
  'flag/de',
  'flag/be',
  'flag/fr',
  'flag/it',
  'flag/lu',
  'flag/nl',
  'flag/es',
  'flag/at',
  'flag/eu',
  'google',
  'googleplus',
  'heart',
  'hook',
  'hookSquare',
  'immo24',
  'info',
  'instagram',
  'ios',
  'lifestyle/familycar',
  'lifestyle/firstcar',
  'lifestyle/fourxfour',
  'lifestyle/fuelsaver',
  'lifestyle/luxury',
  'lifestyle/roadster-l',
  'location',
  'mail',
  'navigation/car',
  'navigation/caravan',
  'navigation/motocycle',
  'navigation/truck',
  'people',
  'phone',
  'pin-car-xl',
  'pin',
  'pinCar',
  'pinMoto',
  'pinterest',
  'placeholder-car',
  'placeholder-moto',
  'placeholder-truck',
  'plus',
  'print',
  'saved-search',
  'scout24',
  'search',
  'security',
  'sharing',
  'star-half',
  'star',
  't-online',
  'tip',
  'truckscout',
  'twitter',
  'vehicles',
  'whatsapp',
  'windows',
  'youtube'
]
