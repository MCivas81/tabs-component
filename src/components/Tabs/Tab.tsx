import React from 'react'
import { TabProps, TabVariant } from './Tabs.types'
import Badge from './Badge'

interface Props extends TabProps {
  isSelected: boolean
  onClick: () => void
  variant?: TabVariant
}

const Tab: React.FC<Props> = ({
  id,
  label,
  badge,
  isSelected,
  onClick,
  variant
}) => {
  return (
    <button
      role='tab'
      id={`tab-${id}`}
      aria-selected={isSelected}
      aria-controls={`panel-${id}`}
      className={`tab tab--${variant} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {label}
      {badge && <Badge {...badge} />}
    </button>
  )
}

export default Tab
