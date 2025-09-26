import React from 'react'
import './cards.scss'

const labels = ['File A', 'File B', 'File C', 'File D', 'File E', 'File F']

const FilesContent: React.FC = () => (
  <section className='cards-section'>
    <div className='cards-grid files'>
      {labels.map(label => (
        <div className='card' tabIndex={0} aria-label={label} key={label}>
          {label}
        </div>
      ))}
    </div>
  </section>
)

export default FilesContent
