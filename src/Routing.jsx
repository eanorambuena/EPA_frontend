import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Chat from './Chat'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing