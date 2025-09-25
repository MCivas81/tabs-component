import React from 'react'
import { TabsProps } from './Tabs.types'
import Tab from './Tab'
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
          <Tab
            key={tab.id}
            {...tab}
            isSelected={tab.id === selectedTab}
            onClick={() => handleSelect(tab.id)}
            variant={variant}
          />
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
