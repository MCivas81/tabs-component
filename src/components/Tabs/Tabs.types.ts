export type TabVariant = 'underline' | 'pill'
export type BadgeVariant = 'neutral' | 'positive' | 'negative'

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

export interface TabProps {
  id: string
  label: string
  badge?: BadgeProps
  content?: React.ReactNode
}

export interface TabsProps {
  tabs: TabProps[]
  selectedTab: string
  handleSelect: (id: string) => void
  variant?: TabVariant
}
