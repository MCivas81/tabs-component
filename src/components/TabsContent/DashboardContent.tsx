import React from 'react'
import './cards.scss'

const labels = [
  'RC Auto',
  'Assistenza stradale',
  'Furto e incendio',
  'Eventi atmosferici',
  'Cristalli',
  'Kasko',
  'Atti vandalici',
  'Infortuni del conducente'
]

const DashboardContent: React.FC = () => (
  <section className='cards-section'>
    <div className='cards-grid dashboard'>
      {labels.map(label => (
        <div className='card' tabIndex={0} aria-label={label} key={label}>
          {label}
        </div>
      ))}
    </div>
  </section>
)

export default DashboardContent
