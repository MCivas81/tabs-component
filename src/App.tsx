import Tabs from './components/Tabs/Tabs'
import Tab from './components/Tabs/Tab'
import DashboardContent from './components/TabsContent/DashboardContent'
import EmailsContent from './components/TabsContent/EmailsContent'
import FilesContent from './components/TabsContent/FilesContent'
import MessagesContent from './components/TabsContent/MessagesContent'
import './App.scss'

function App () {
  return (
    <div className='App'>
      <h1>
        Tabs <span>Component</span>
      </h1>
      <Tabs variant='pill' tabListLabel='User settings'>
        <Tab id='dashboard' label='Dashboard'>
          <DashboardContent />
        </Tab>
        <Tab
          id='emails'
          label='Emails'
          badge={{ label: 'Info', variant: 'neutral' }}
        >
          <EmailsContent />
        </Tab>
        <Tab
          id='files'
          label='Files'
          badge={{ label: 'Warning', variant: 'negative' }}
        >
          <FilesContent />
        </Tab>
        <Tab
          id='messages'
          label='Messages'
          badge={{ label: 'Success', variant: 'positive' }}
        >
          <MessagesContent />
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
