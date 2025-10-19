import React, { useEffect, useRef, useState } from 'react'
import { TabProps, TabsProps } from './Tabs.types'
import './Tabs.scss'

const Tabs: React.FC<TabsProps> = ({
  children,
  preSelectedTab,
  tabListLabel,
  variant = 'underline',
  autoSelect = false,
  onTabChange
}) => {
  const tabRefs = useRef<HTMLButtonElement[]>([])

  // Convert children to array of Tab elements
  const tabsArray = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[]

  // Ensure all children are <Tab> elements
  tabsArray.forEach(child => {
    if ((child.type as any).displayName !== 'Tab') {
      throw new Error('<Tabs> only accepts <Tab> elements as children.')
    }
  })

  // Find first enabled tab
  const getFirstEnabledTab = () => {
    const firstEnabled = tabsArray.find(tab => !tab.props.disabled)
    return firstEnabled ? firstEnabled.props.id : undefined
  }

  // Initialize selected tab
  const getInitialTab = () => {
    const preselected = tabsArray.find(tab => tab.props.id === preSelectedTab)
    if (preselected && !preselected.props.disabled) return preSelectedTab
    return getFirstEnabledTab()
  }

  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    getInitialTab()
  )

  // Handle case where preSelectedTab is disabled or removed
  useEffect(() => {
    const current = tabsArray.find(tab => tab.props.id === selectedTab)
    if (!current || current.props.disabled) {
      const nextEnabled = getFirstEnabledTab()
      setSelectedTab(nextEnabled)
      onTabChange?.(nextEnabled!)
    }
  }, [])

  const handleSelect = (id: string) => {
    const tab = tabsArray.find(t => t.props.id === id)
    if (!tab || tab.props.disabled) return
    setSelectedTab(id)
    onTabChange?.(id)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const { key } = e
    const totalTabs = tabsArray.length

    // Helper to find next enabled tab index
    const findNextEnabled = (start: number, step: number) => {
      for (let i = 1; i <= totalTabs; i++) {
        const nextIdx = (start + i * step + totalTabs) % totalTabs
        const nextTab = tabsArray[nextIdx]
        if (nextTab && !nextTab.props.disabled) return nextIdx
      }
      return start
    }

    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(findNextEnabled(idx, 1)),
      ArrowLeft: () => focusTab(findNextEnabled(idx, -1)),
      Home: () => focusTab(findNextEnabled(-1, 1)),
      End: () => focusTab(findNextEnabled(totalTabs, -1))
    }

    const action = keyActions[key]
    if (action) {
      e.preventDefault()
      action()
    }
  }

  const focusTab = (idx: number) => {
    const tab = tabsArray[idx]
    if (!tab || tab.props.disabled) return
    if (autoSelect) handleSelect(tab.props.id)
    tabRefs.current[idx]?.focus()
  }

  return (
    <div className='tabs'>
      <div
        role='tablist'
        aria-label={tabListLabel}
        className={`tabs__list tabs__list--${variant}`}
      >
        {tabsArray.map((tab, idx) => {
          const isSelected = tab.props.id === selectedTab
          return (
            <button
              key={tab.props.id}
              role='tab'
              id={`tab-${tab.props.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.props.id}`}
              tabIndex={isSelected && !tab.props.disabled ? 0 : -1}
              className={`tab tab--${variant} ${isSelected ? 'selected' : ''}`}
              ref={el => {
                if (el) tabRefs.current[idx] = el
              }}
              onClick={() => handleSelect(tab.props.id)}
              onKeyDown={e => handleKeyDown(e, idx)}
              disabled={tab.props.disabled}
            >
              {tab.props.label}
              {tab.props.badge && (
                <span className={`badge badge--${tab.props.badge.variant}`}>
                  {tab.props.badge.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {tabsArray.map(tab => {
        const isSelected = tab.props.id === selectedTab
        return (
          <div
            key={tab.props.id}
            role='tabpanel'
            id={`panel-${tab.props.id}`}
            className='tab__panel'
            aria-labelledby={`tab-${tab.props.id}`}
            tabIndex={0}
            hidden={!isSelected}
          >
            {isSelected && !tab.props.disabled && tab.props.children}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
