import React from 'react'
import { MessageSchema, Auth } from './services/schema'
import Dropdown from './components/Dropdown'

interface Props {
  message: MessageSchema
}

export default function ChatBubble({ message } : Props) {
  const user = message.user
  if (!user) return null
  const isMe = user == Auth.getCurrentUser()
  const color = isMe === true ? '#c4b5fd' : '#fcd34d'
  return (
    <article className={`flex gap-2.5 items:start text-gray-900 dark:text-gray-950 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <img className="w-8 h-8 rounded-full" src={user.imgSrc} alt={user.name} />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 transition active:scale-125 ease-in-out duration-200 z-50 motion-reduce:transition-none motion-reduce:hover:transform-none border-gray-300 ${isMe ? 'rounded-s-xl rounded-ee-xl' : 'rounded-e-xl rounded-es-xl'}`}
        style={{backgroundColor: color}}
      >
        <div className="flex items-center justify-between rtl:space-x-reverse">
          <span className="text-sm font-semibold">{isMe ? 'Tú' : user.name}</span>
          <span className="text-sm font-normal text-gray-500">{message.createdAt}</span>
        </div>
        <p className="text-sm font-normal py-2.5">{message.message}</p>
        <span className="text-sm font-normal text-gray-500">Recibido</span>
      </div>
      <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500" type="button">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      </button>
      <Dropdown />
    </article>                                                                                                                         
  )
}
