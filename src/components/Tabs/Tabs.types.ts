export type TabVariant = 'underline' | 'pill'
export type BadgeVariant = 'neutral' | 'positive' | 'negative'

export interface BadgeProps {
  label: string // Text label displayed inside the badge.
  variant: BadgeVariant // Visual style variant for the badge. Can be 'neutral', 'positive', or 'negative'.
}

export interface TabProps {
  id: string // Unique identifier for the tab.
  label: string // Text label displayed on the tab.
  badge?: BadgeProps // (Optional) Badge to display alongside the tab label.
  disabled?: boolean // (Optional) If true, the tab is rendered in a disabled state and is not interactive.
  children: React.ReactNode // Content to be displayed when the tab is active.
}

export interface TabsProps {
  children: React.ReactNode // The tab panels and tab triggers to be rendered inside the Tabs component.
  preSelectedTab?: string // (Optional) ID of the tab to be pre-selected on initial render. If not provided, the first tab will be selected by default.
  tabListLabel: string // Accessible label for the tab list, used for screen readers.
  variant?: TabVariant // (Optional) Visual style variant for the Tabs component. Can be 'underline' or 'pill'. Defaults to 'underline'.
  autoSelect?: boolean // (Optional) If true, tabs are automatically selected on focus. Defaults to false.
  onTabChange?: (id : string) => void // (Optional) Callback function fired when the selected tab changes, receiving the new tab ID as an argument.
}
