import React, { useRef, useState, KeyboardEvent } from 'react'
import { TabsProps } from './Tabs.types'
import './Tabs.scss'

const Tabs: React.FC<TabsProps> = ({
  tabs,
  preSelectedTab,
  tabListLabel,
  variant = 'underline'
}) => {
  const tabRefs = useRef<HTMLButtonElement[]>([])
  const [selectedTab, setSelectedTab] = useState<string>(preSelectedTab)

  const focusTab = (idx: number) => tabRefs.current[idx]?.focus()

  const handleSelect = (id: string) => {
    setSelectedTab(id)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextIdx = (idx + 1) % tabs.length
      focusTab(nextIdx)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevIdx = (idx - 1 + tabs.length) % tabs.length
      focusTab(prevIdx)
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleSelect(tabs[idx].id)
    }
  }

  return (
    <div className='tabs'>
      <div
        role='tablist'
        aria-label={tabListLabel}
        className={`tabs__list tabs__list--${variant}`}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            role='tab'
            id={`tab-${tab.id}`}
            aria-selected={tab.id === selectedTab}
            aria-controls={`panel-${tab.id}`}
            aria-label={tab.label}
            tabIndex={tab.id === selectedTab ? 0 : -1}
            className={`tab tab--${variant} ${
              tab.id === selectedTab ? 'selected' : ''
            }`}
            ref={el => {
              if (el) tabRefs.current[idx] = el
            }}
            onClick={() => handleSelect(tab.id)}
            onKeyDown={e => handleKeyDown(e, idx)}
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
      {tabs.map(
        tab =>
          tab.id === selectedTab && (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role='tabpanel'
              aria-label={tab.label}
              className='tabs__panel'
              tabIndex={0}
            >
              {tab.content}
            </div>
          )
      )}
    </div>
  )
}

export default Tabs
