import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Tabs from '../Tabs'
import Tab from '../Tab'

describe('Tabs component', () => {
  const renderTabs = (tabsProps = {}) =>
    render(
      <Tabs tabListLabel='Example tabs' {...tabsProps}>
        <Tab id='tab-1' label='Tab 1'>
          Content 1
        </Tab>
        <Tab id='tab-2' label='Tab 2'>
          Content 2
        </Tab>
        <Tab id='tab-3' label='Tab 3'>
          Content 3
        </Tab>
      </Tabs>
    )

  it('renders correctly with given tabs', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('applies the provided tabListLabel as aria-label on the tablist', () => {
    renderTabs()
    expect(
      screen.getByRole('tablist', { name: 'Example tabs' })
    ).toBeInTheDocument()
  })

  it('applies variant classes to list and tabs', () => {
    renderTabs({ variant: 'pills' })
    const tablist = screen.getByRole('tablist')
    expect(tablist.className).toContain('tabs__list--pills')

    const tabs = screen.getAllByRole('tab')

    tabs.forEach(tab => {
      expect(tab.className).toContain('tab--pills')
    })
  })

  it('selects the first tab by default', () => {
    renderTabs()
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('selects the preSelectedTab on initial render', () => {
    renderTabs({ preSelectedTab: 'tab-2' })
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('calls onTabChange when a tab is clicked', () => {
    const onTabChange = vi.fn()
    renderTabs({ onTabChange })

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    fireEvent.click(tab2)

    expect(onTabChange).toHaveBeenCalledWith('tab-2')
    expect(tab2).toHaveAttribute('aria-selected', 'true')
  })

  it('handles ArrowRight and ArrowLeft keyboard navigation', () => {
    renderTabs()

    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()

    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(document.activeElement).toBe(tabs[1])

    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(tabs[0])
  })

  it('handles Home and End keys', () => {
    renderTabs()

    const tabs = screen.getAllByRole('tab')
    tabs[1].focus()

    fireEvent.keyDown(tabs[1], { key: 'End' })
    expect(document.activeElement).toBe(tabs[2])

    fireEvent.keyDown(tabs[2], { key: 'Home' })
    expect(document.activeElement).toBe(tabs[0])
  })

  it('autoSelect changes selected tab on keyboard navigation', () => {
    renderTabs({ autoSelect: true })
    const tabs = screen.getAllByRole('tab')

    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('handles disabled tabs correctly', () => {
    render(
      <Tabs tabListLabel='Disabled tabs example'>
        <Tab id='tab-1' label='Tab 1'>
          Content 1
        </Tab>
        <Tab id='tab-2' label='Tab 2' disabled>
          Content 2
        </Tab>
        <Tab id='tab-3' label='Tab 3'>
          Content 3
        </Tab>
      </Tabs>
    )
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    expect(tab2).toBeDisabled()
    expect(screen.getByText('Content 1')).toBeVisible()

    fireEvent.click(tab2)
    expect(screen.getByText('Content 1')).toBeVisible()

    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(document.activeElement).toBe(tabs[2])
  })

  it('throws error if child is not a Tab element', () => {
    const InvalidChild = () => <div>Invalid</div>
    expect(() =>
      render(
        <Tabs tabListLabel='Invalid test'>
          <InvalidChild />
        </Tabs>
      )
    ).toThrow('<Tabs> only accepts <Tab> elements as children.')
  })
})
