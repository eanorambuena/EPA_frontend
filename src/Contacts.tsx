import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { API_URL } from './services/variables'
import useAuthentication from './hooks/useAuthentication'
import { useCurrentUser } from './hooks/useCurrentUser'

interface Props {
  searchParams?: { message: string }
}

// Definición de la función Login sin usar React.FC
function Contacts({ searchParams }: Props) {
  const { user } = useCurrentUser()
  const authenticationConfig = useAuthentication()
  const [contacts, setContacts] = useState<{ nickname: string, userContact: string }[]>([])

  const handleGetContacts = async () => {
    if (user) {
      try {
        const response_get = await axios.get(`${API_URL}/contacts/user/${user.id}`, authenticationConfig)
        console.log('Contactos:', response_get.data)
        setContacts(response_get.data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }
  }

  useEffect(() => {
    handleGetContacts()
  }, [user])

  return (
    <Layout>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen'>
        <button
          className='bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
          onClick={() => window.location.href = '/contactRegister'}
        >
          Registrar Contacto
        </button>
        <div className='flex flex-col gap-2'>
          {contacts.map((contact, index) => (
            <div key={index} className='p-4 rounded-md shadow-md'>
              <p className='text-lg font-bold'>{contact.nickname}</p>
              <p className='text-sm text-gray-500'>{contact.userContact}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Contacts