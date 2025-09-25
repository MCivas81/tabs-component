import { useState } from 'react'
import Tabs from './components/Tabs/Tabs'
import { TabProps } from './components/Tabs/Tabs.types'
import DashboardContent from './components/TabsContent/DashboardContent'
import EmailsContent from './components/TabsContent/EmailsContent'
import FilesContent from './components/TabsContent/FilesContent'
import MessagesContent from './components/TabsContent/MessagesContent'
import './App.scss'

const tabData: TabProps[] = [
  { id: '1', label: 'Dashboard', content: <DashboardContent /> },
  {
    id: '2',
    label: 'Emails',
    badge: { label: 'Info', variant: 'neutral' },
    content: <EmailsContent />
  },
  {
    id: '3',
    label: 'Files',
    badge: { label: 'Success', variant: 'positive' },
    content: <FilesContent />
  },
  {
    id: '4',
    label: 'Messages',
    badge: { label: 'Warning', variant: 'negative' },
    content: <MessagesContent />
  }
]

function App () {
  const [selected, setSelected] = useState(tabData[0].id)

  return (
    <div className='App'>
      <h1>Tabs Component</h1>
      <Tabs
        tabs={tabData}
        selectedTab={selected}
        handleSelect={setSelected}
        variant='pill'
      />
    </div>
  )
}

export default App
