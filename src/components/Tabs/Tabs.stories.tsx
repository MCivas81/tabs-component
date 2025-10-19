import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['underline', 'pill'],
      description: 'Visual variant of the Tabs component',
      defaultValue: 'underline'
    },
    preSelectedTab: {
      control: 'text',
      description: 'ID of the tab to be selected by default'
    },
    tabListLabel: {
      control: 'text',
      description: 'Accessible label for the tab list'
    },
    autoSelect: {
      control: 'boolean',
      description: 'Automatically select tab on arrow key navigation'
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback fired when the tab changes'
    }
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

const Template = (args: React.ComponentProps<typeof Tabs>) => (
  <Tabs {...args}>
    <Tab id='tab-1' label='Tab 1'>
      Content 1
    </Tab>
    <Tab id='tab-2' label='Tab 2'>
      Content 2
    </Tab>
    <Tab id='tab-3' label='Tab 3'>
      Content 3
    </Tab>
    <Tab id='tab-4' label='Tab 4'>
      Content 4
    </Tab>
  </Tabs>
)

const TemplateWithBadges = (args: React.ComponentProps<typeof Tabs>) => (
  <Tabs {...args}>
    <Tab id='tab-1' label='Tab 1'>
      Content 1
    </Tab>
    <Tab id='tab-2' label='Tab 2' badge={{ label: 'Info', variant: 'neutral' }}>
      Content 2
    </Tab>
    <Tab
      id='tab-3'
      label='Tab 3'
      badge={{ label: 'Success', variant: 'positive' }}
    >
      Content 3
    </Tab>
    <Tab
      id='tab-4'
      label='Tab 4'
      badge={{ label: 'Warning', variant: 'negative' }}
    >
      Content 4
    </Tab>
  </Tabs>
)

export const Underline: Story = {
  args: {
    preSelectedTab: 'tab-1',
    tabListLabel: 'User settings'
  },
  render: Template
}

export const Pill: Story = {
  args: {
    preSelectedTab: 'tab-2',
    tabListLabel: 'User settings',
    variant: 'pill'
  },
  render: Template
}

export const WithBadgesAndAutoSelect: Story = {
  args: {
    preSelectedTab: 'tab-1',
    tabListLabel: 'User settings',
    variant: 'pill',
    autoSelect: true,
    onTabChange: (id: string) => {
      console.log(`Selected tab changed to: ${id}`)
    }
  },
  render: TemplateWithBadges
}
