import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MainPage from './MainPage'
import Landing from './Landing'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/about" />
        <Route path='/chats/:id' element={<MainPage />} />
        <Route path="/chats" element={<MainPage />} />
        <Route path="/docs" />
      </Routes>
    </BrowserRouter>
  )
}
