import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MainPage from './MainPage'
import Landing from './Landing'
import About from './About'
import DocsPage from './DocsPage'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/about" element={<About/>}/>
        <Route path='/chats/:id' element={<MainPage />} />
        <Route path="/chats" element={<MainPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
