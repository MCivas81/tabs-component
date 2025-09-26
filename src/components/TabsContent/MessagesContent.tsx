import React from 'react'
import './cards.scss'

const labels = ['Message 1', 'Message 2']

const MessagesContent: React.FC = () => (
  <section className='cards-section'>
    <div className='cards-grid messages'>
      {labels.map(label => (
        <div className='card' tabIndex={0} aria-label={label} key={label}>
          {label}
        </div>
      ))}
    </div>
  </section>
)

export default MessagesContent
