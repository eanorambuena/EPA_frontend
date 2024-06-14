import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import DocsPage from './DocsPage'
import Landing from './Landing'
import Login from './Login'
import MainPage from './MainPage'
import SignUp from './SignUp'
import ContactRegister from './ContactsRegister'
import useToaster from './hooks/useToaster'
import ToastContext from './hooks/useToast'
import AuthContext from './hooks/useCurrentUser'
import useCurrentUserOncePerContext from './hooks/useCurrentUserOncePerContext'
import SelectedChatContext from './hooks/useSelectedChatId'
import useLocalStorage from './hooks/useLocalStorage'

export default function Routing() {
  const [ref, toast] = useToaster()
  const authData = useCurrentUserOncePerContext()
  const [selectedChatId, selectChat] = useLocalStorage('selectedChatId', -1)

  return (
    <ToastContext.Provider value={toast}>
      <AuthContext.Provider value={authData}>
        <SelectedChatContext.Provider value={{ selectedChatId, selectChat }}>
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
        </SelectedChatContext.Provider>
      </AuthContext.Provider>
    </ToastContext.Provider>
  )
}
