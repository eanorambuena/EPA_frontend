import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Chat'
import React from 'react'
import Main from './Main'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/about" />
        <Route path="/chats" element={<Main />} />
        <Route path='/chats/:id' element={<Chat />} />
        <Route path="/docs" />
      </Routes>
    </BrowserRouter>
  )
}
