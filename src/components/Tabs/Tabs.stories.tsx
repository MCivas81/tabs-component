import { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['underline', 'pill'],
      description: 'Variant of the tabs',
      defaultValue: 'underline'
    },
    handleSelect: { action: 'tab selected' },
    selectedTab: { control: 'text' },
    tabs: { control: 'object' }
  },
  parameters: {
    docs: {
      description: {
        component:
          'A tab component that allows users to switch between different content sections.'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = (args: React.ComponentProps<typeof Tabs>) => {
  const [selectedTab, setSelectedTab] = useState(args.selectedTab)

  return (
    <Tabs
      {...args}
      selectedTab={selectedTab}
      handleSelect={(id: string) => {
        setSelectedTab(id)
        args.handleSelect?.(id)
      }}
    />
  )
}

export const underline: Story = {
  args: {
    tabs: [
      { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
      { id: '3', label: 'Tab 3', content: <div>Content 3</div> },
      {
        id: '4',
        label: 'Tab 4',
        badge: { label: 'Success', variant: 'positive' },
        content: <div>Content 4</div>
      }
    ],
    selectedTab: '1',
    handleSelect: (id: string) => {
      console.log(`Selected tab: ${id}`)
    },
    variant: 'underline'
  },
  render: Template
}

export const Pill: Story = {
  args: {
    tabs: [
      { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
      { id: '3', label: 'Tab 3', content: <div>Content 3</div> },
      {
        id: '4',
        label: 'Tab 4',
        badge: { label: 'Warning', variant: 'negative' },
        content: <div>Content 4</div>
      }
    ],
    selectedTab: '1',
    handleSelect: (id: string) => {
      console.log(`Selected tab: ${id}`)
    },
    variant: 'pill'
  },
  render: Template
}
