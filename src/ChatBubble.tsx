import React from 'react'

interface Props {
  username: string
  imgSrc: string
  message: string
  hourAndMinutes: string
  me: boolean
}

export default function ChatBubble({ username, imgSrc, message, hourAndMinutes, me } : Props) {
  const color = me === true ? '#c4b5fd' : '#fcd34d'
  return (
    <div className={`flex gap-2.5 items:start ${me ? 'flex-row-reverse' : 'flex-row'}`}>
      <img className="w-8 h-8 rounded-full" src={imgSrc} alt={username} />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-300 ${me ? 'rounded-s-xl rounded-ee-xl' : 'rounded-e-xl rounded-es-xl'}`}
        style={{backgroundColor: color}}
      >
        <div className="flex items-center justify-between rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{username}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{hourAndMinutes}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Recibido</span>
      </div>
      <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      </button>
      <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
        </ul>
      </div>
    </div>                                                                                                                         
  )
}