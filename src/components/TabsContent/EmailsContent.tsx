import React from 'react'
import './cards.scss'

const labels = ['Email 1', 'Email 2', 'Email 3', 'Email 4']

const EmailsContent: React.FC = () => (
  <section className='cards-section'>
    <div className='cards-grid emails'>
      {labels.map(label => (
        <div className='card' tabIndex={0} aria-label={label} key={label}>
          {label}
        </div>
      ))}
    </div>
  </section>
)

export default EmailsContent
