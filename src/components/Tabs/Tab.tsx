import React from 'react'
import { TabProps } from './Tabs.types'

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>

Tab.displayName = 'Tab'

export default Tab
