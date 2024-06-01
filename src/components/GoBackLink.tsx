import React from 'react'
import GoBackArrow from '../icons/GoBackArrow'
import { useLocation, useNavigate } from 'react-router-dom'

export default function GoBackLink() {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  if (location.pathname === '/') {
    return null
  }

  return (
    <a
      className='flex items-center py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover group text-sm'
      onClick={goBack}
    >
      <GoBackArrow />
      {' '}
      Volver atrás
    </a>
  )
}
