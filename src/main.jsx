import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routing from './Routing'
import { PRODUCTION } from './services/variables'

const root = ReactDOM.createRoot(document.getElementById('root'))

if (PRODUCTION) {
  root.render(
    <Routing />
  )
}
else {
  root.render(
    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  )
}
