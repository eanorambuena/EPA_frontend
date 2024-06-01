import React from 'react'

export default function Dropdown() {
  return (
    <div
      className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600'
      id='dropdownDots'
    >
      <ul
        aria-labelledby='dropdownMenuIconButton'
        className='py-2 text-sm text-gray-700 dark:text-gray-200'
      >
        <li>
          <a
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            href='#'
          >
            Reply
          </a>
        </li>
        <li>
          <a
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            href='#'
          >
            Forward
          </a>
        </li>
        <li>
          <a
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            href='#'
          >
            Copy
          </a>
        </li>
        <li>
          <a
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            href='#'
          >
            Report
          </a>
        </li>
        <li>
          <a
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            href='#'
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  )
}
