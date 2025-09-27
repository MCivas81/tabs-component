import { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
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
    preSelectedTab: { control: 'text' },
    tabListLabel: { control: 'text' },
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
  return (
    <Tabs
      {...args}
      preSelectedTab={args.preSelectedTab}
      tabListLabel='User settings'
      variant={args.variant}
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
    preSelectedTab: '1',
    tabListLabel: 'User settings',
    variant: 'underline'
  },
  render: Template
}

export const Pill: Story = {
  args: {
    tabs: [
      { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
      {
        id: '3',
        label: 'Tab 3',
        badge: { label: 'Info', variant: 'neutral' },
        content: <div>Content 3</div>
      },
      {
        id: '4',
        label: 'Tab 4',
        badge: { label: 'Warning', variant: 'negative' },
        content: <div>Content 4</div>
      }
    ],
    preSelectedTab: '1',
    tabListLabel: 'User settings',
    variant: 'pill'
  },
  render: Template
}
