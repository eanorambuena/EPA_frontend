import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Landing'
import './index.css'
import Routing from './Routing'
import { seed } from './services/seeder'

seed()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Routing />
  </React.StrictMode>,
)
