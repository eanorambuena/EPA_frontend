import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import DocsPage from './DocsPage'
import Landing from './Landing'
import Login from './Login'
import MainPage from './MainPage'
import SignUp from './SignUp'
import ContactRegister from './ContactsRegister'
import useToast from './hooks/useToast'
import ToastContext from './hooks/ToastContext'
import AuthContext from './hooks/AuthContext'
import useCurrentUser from './hooks/useCurrentUser'

export default function Routing() {
  const [ref, toast] = useToast()
  const [user, logout] = useCurrentUser()

  return (
    <ToastContext.Provider value={toast}>
      <AuthContext.Provider value={{ user, logout }}>
        <div ref={ref} />
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
              element={<SignUp />}
              path='/signup'
            />
            <Route
              element={<ContactRegister />}
              path='/contactRegister'
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ToastContext.Provider>
  )
}
