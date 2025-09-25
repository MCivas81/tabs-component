import React from 'react'
import { TabsProps } from './Tabs.types'
import './Tabs.scss'

const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedTab,
  handleSelect,
  variant = 'underline'
}) => {
  return (
    <div className='tabs'>
      <div
        role='tablist'
        aria-label='Tabs'
        className={`tabs__list tabs__list--${variant}`}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role='tab'
            id={`tab-${tab.id}`}
            aria-selected={tab.id === selectedTab}
            aria-controls={`panel-${tab.id}`}
            className={`tab tab--${variant} ${
              tab.id === selectedTab ? 'selected' : ''
            }`}
            onClick={() => handleSelect(tab.id)}
            onKeyDown={e => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                handleSelect(tab.id)
              }
            }}
          >
            {tab.label}
            {tab.badge && (
              <span className={`badge badge--${tab.badge.variant}`}>
                {tab.badge.label}
              </span>
            )}
          </button>
        ))}
      </div>
      {tabs.map(tab =>
        tab.id === selectedTab ? (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role='tabpanel'
            aria-labelledby={`tab-${tab.id}`}
            className='tabs__panel'
          >
            {tab.content}
          </div>
        ) : null
      )}
    </div>
  )
}

export default Tabs
