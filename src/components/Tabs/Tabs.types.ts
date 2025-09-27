export type TabVariant = 'underline' | 'pill'
export type BadgeVariant = 'neutral' | 'positive' | 'negative'

export interface BadgeProps {
  label: string // Text displayed inside the badge
  variant: BadgeVariant // Visual style of the badge
}

export interface TabProps {
  id: string // Unique identifier for the tab
  label: string // Text displayed on the tab
  badge?: BadgeProps // Optional badge displayed on the tab
  content?: React.ReactNode // Content displayed when the tab is selected
}

export interface TabsProps {
  tabs: TabProps[] // Array of tab objects
  tabListLabel: string // ARIA label for the tab list
  preSelectedTab: string // ID of the tab to be selected initially
  variant?: TabVariant // Visual style of the tabs
}
