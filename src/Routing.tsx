import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import DocsPage from './DocsPage'
import Landing from './Landing'
import Login from './Login'
import MainPage from './MainPage'
import ContactRegister from './Contacts'


export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Landing />}
          path='/'
        />
        <Route
          element={<About />}
          path='/about'
        />
        <Route
          element={<MainPage />}
          path='/chats/:id'
        />
        <Route
          element={<MainPage />}
          path='/chats'
        />
        <Route
          element={<DocsPage />}
          path='/docs'
        />
        <Route
          element={<Login />}
          path='/login'
        />
        <Route
          element={<ContactRegister />}
          path='/contactRegister'
        />
      </Routes>
    </BrowserRouter>
  )
}
