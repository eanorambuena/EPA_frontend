export default function ChatRow({ user, message, imgNumber }) {
  const  hourAndMinutes = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  return (
    <li className='p-4 sm:p-6 font-4xl'>
      <div className='flex items-center space-x-3 rtl:space-x-reverse'>
        <div className='flex-shrink-0'>
          <img className='w-8 h-8 rounded-full' src={`https://i.pravatar.cc/150?img=${imgNumber}`} alt={user} />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex flex-row justify-between'>
            <p className='font-semibold text-gray-900 truncate dark:text-white'>
              {user}
            </p>
            <p className='text-gray-500 truncate dark:text-gray-400'>
              {hourAndMinutes}
            </p>
          </div>
          <p className='text-gray-500 truncate dark:text-gray-400'>
            {message}
          </p>
        </div>
        <span className='hidden sm:inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
          <span className='w-2 h-2 me-1 bg-green-500 rounded-full'></span>
          Disponible
        </span>
      </div>
    </li>
  )
}
