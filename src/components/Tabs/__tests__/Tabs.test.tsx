import { render, screen, fireEvent } from '@testing-library/react'
import { TabsProps } from '../Tabs.types'
import Tabs from '../Tabs'
import { vi } from 'vitest'

describe('Tabs component', () => {
  const defaultTabs: TabsProps['tabs'] = [
    { id: 'emails', label: 'Emails', content: <div>Emails content</div> },
    { id: 'files', label: 'Files', content: <div>Files content</div> },
    {
      id: 'messages',
      label: 'Messages',
      content: <div>Messages content</div>,
      badge: { label: '3', variant: 'positive' }
    }
  ]

  const setup = (preSelectedTab = 'emails') => {
    return render(
      <Tabs
        tabs={defaultTabs}
        preSelectedTab={preSelectedTab}
        tabListLabel='User settings'
        variant='pill'
      />
    )
  }

  it('renders all tab buttons', () => {
    setup()
    expect(screen.getByRole('tab', { name: /emails/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /files/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /messages/i })).toBeInTheDocument()
  })

  it('shows only the selected tab content', () => {
    setup('files')
    expect(screen.getByText(/files content/i)).toBeInTheDocument()
    expect(screen.queryByText(/emails content/i)).not.toBeInTheDocument()
  })

  it('changes selected tab when a tab is clicked', () => {
    setup('emails')
    fireEvent.click(screen.getByRole('tab', { name: /files/i }))
    expect(screen.getByText(/files content/i)).toBeInTheDocument()
    expect(screen.queryByText(/emails content/i)).not.toBeInTheDocument()
  })

  it('changes selected tab when pressing Enter or Space', () => {
    setup('emails')
    const tab = screen.getByRole('tab', { name: /files/i })
    fireEvent.keyDown(tab, { key: 'Enter' })
    expect(screen.getByText(/files content/i)).toBeInTheDocument()
    fireEvent.keyDown(tab, { key: ' ' })
    expect(screen.getByText(/files content/i)).toBeInTheDocument()
  })

  it('focuses next tab on ArrowRight keydown', () => {
    setup('emails')
    const emailsTab = screen.getByRole('tab', { name: /emails/i })
    const filesTab = screen.getByRole('tab', { name: /files/i })

    filesTab.focus = vi.fn()
    fireEvent.keyDown(emailsTab, { key: 'ArrowRight' })
    expect(filesTab.focus).toHaveBeenCalled()
  })

  it('focuses previous tab on ArrowLeft keydown', () => {
    setup('files')
    const filesTab = screen.getByRole('tab', { name: /files/i })
    const emailsTab = screen.getByRole('tab', { name: /emails/i })

    emailsTab.focus = vi.fn()
    fireEvent.keyDown(filesTab, { key: 'ArrowLeft' })
    expect(emailsTab.focus).toHaveBeenCalled()
  })

  it('wraps focus to first tab when ArrowRight on last tab', () => {
    setup('messages')
    const messagesTab = screen.getByRole('tab', { name: /messages/i })
    const emailsTab = screen.getByRole('tab', { name: /emails/i })

    emailsTab.focus = vi.fn()
    fireEvent.keyDown(messagesTab, { key: 'ArrowRight' })
    expect(emailsTab.focus).toHaveBeenCalled()
  })

  it('wraps focus to last tab when ArrowLeft on first tab', () => {
    setup('emails')
    const emailsTab = screen.getByRole('tab', { name: /emails/i })
    const messagesTab = screen.getByRole('tab', { name: /messages/i })

    messagesTab.focus = vi.fn()
    fireEvent.keyDown(emailsTab, { key: 'ArrowLeft' })
    expect(messagesTab.focus).toHaveBeenCalled()
  })

  it('renders a badge if provided', () => {
    setup()
    expect(screen.getByText('3')).toHaveClass('badge')
    expect(screen.getByText('3')).toHaveClass('badge--positive')
  })

  it('applies the correct variant class to tablist and tabs', () => {
    setup('emails')
    const tablist = screen.getByRole('tablist')
    expect(tablist).toHaveClass('tabs__list--pill')
    expect(screen.getByRole('tab', { name: /emails/i })).toHaveClass(
      'tab--pill'
    )
  })

  it('renders nothing if tabs array is empty', () => {
    render(
      <Tabs tabs={[]} preSelectedTab='' tabListLabel='User settings' />
    )
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument()
  })
})
