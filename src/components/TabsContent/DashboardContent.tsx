import React from 'react'
import './cards.scss'

const DashboardContent: React.FC = () => (
  <div className='cards-grid dashboard'>
    <div className='card'>Stats</div>
    <div className='card'>Charts</div>
    <div className='card'>Overview</div>
    <div className='card'>Reports</div>
    <div className='card'>Notifications</div>
  </div>
)

export default DashboardContent
