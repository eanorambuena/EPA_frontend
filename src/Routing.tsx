import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Chat'
import React from 'react'
import MainPage from './MainPage'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/about" />
        <Route path="/chats" element={<MainPage />} />
        <Route path='/chats/:id' element={<Chat />} />
        <Route path="/docs" />
      </Routes>
    </BrowserRouter>
  )
}
