import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import DocsPage from './DocsPage'
import Landing from './Landing'
import Login from './Login'
import MainPage from './MainPage'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/about" element={<About/>}/>
        <Route path='/chats/:id' element={<MainPage />} />
        <Route path="/chats" element={<MainPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
