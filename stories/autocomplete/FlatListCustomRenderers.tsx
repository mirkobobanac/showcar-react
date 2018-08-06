import React from 'react'
import PlainList, { CustomeRenderer, IPlainItem } from '../../src/components/autocomplete/datatypes/PlainList'
import { flat as flatData } from './data'

export const IconizedRenderer: CustomeRenderer<number> = p => {
  return (
    <div
      onClick={p.onClick}
      style={{
        backgroundColor: p.selected ? 'rgba(0,0,0,0.2)' : 'transparent',
        display: 'flex',
        padding: '0.5em',
        borderBottom: '1px solid #ccc'
      }}
    >
      <img
        style={{
          maxWidth: '50px',
          maxHeight: '50px',
          borderRadius: '30px',
          marginRight: '0.7em'
        }}
        src={flatData.filter(s => s.id === p.item.id)[0].avatar}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.1em', textTransform: 'capitalize' }}>
          {p.item.label}
        </h3>
        <p style={{ color: '#999', fontSize: '0.9em' }}>Some text about {p.item.label} here </p>
      </div>
    </div>
  )
}

export const ThumbnailRenderer: CustomeRenderer<number> = p => {
  return (
    <div
      onClick={p.onClick}
      style={{
        backgroundColor: p.selected ? 'rgba(0,0,0,0.2)' : 'transparent',
        display: 'flex',
        padding: '0.5em',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer'
      }}
    >
      <img
        style={{
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '10px',
          marginRight: '0.7em'
        }}
        src={flatData.filter(s => s.id === p.item.id)[0].avatar}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.1em', textTransform: 'capitalize' }}>
          {p.item.label}
        </h3>
        <p style={{ color: '#999', fontSize: '0.9em' }}>Some text about {p.item.label} here </p>
      </div>
    </div>
  )
}
