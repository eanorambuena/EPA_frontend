import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Chat from './Chat'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/about" />
        <Route path="/chats" />
        <Route path='/chats/:id' element={<Chat />} />
        <Route path="/docs" />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
