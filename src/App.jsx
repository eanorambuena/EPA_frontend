import Chats from './Chats'
import Logo from './icons/Logo'

export default function App() {
  return (
    <>
      <header className='flex items-center justify-start gap-6 p-6 bg-gray-50 dark:bg-gray-950'>
        <h1 className='text-2xl font-bold'>EPA Frontend</h1>
        <Logo />
      </header>
      <main className='flex flex-col items-center justify-center p-6'>
        <Chats />
      </main>
    </>
  )
}
