import React from 'react'
import ChatRow from './ChatRow'

interface Props {
  className?: string
}

export default function Chats({ className }: Props) {
 return (
    <ul role='list' className={`w-full md:w-[70%] lg:w-[50%] divide-y divide-gray-200 dark:divide-gray-700 bg-gray-100 dark:bg-gray-900 ${className}`}>
      <ChatRow user='Andrés Smith' message='Hola te escribo del banco BICE para invitarte' imgNumber={60} />
      <ChatRow user='Cynthia Gacitúa' message='5 papas, 3 tomates, 1 kilo de pan, 3 limones' imgNumber={36} />
      <ChatRow user='Hija' message='Ya llegué a la u, te quiero' imgNumber={1} />
      <ChatRow user='Amor' message='Hablamos después' imgNumber={3} />
      <ChatRow user='Mi bebé' message='Te amo' imgNumber={2} />
      <ChatRow user='Miguel' message='Hola, cómo estás?' imgNumber={8} />
      <ChatRow user='Sandrita' message='No te ví en la mañana' imgNumber={5} />
      <ChatRow user='Javier' message='Muchas gracias tía' imgNumber={4} />
      <ChatRow user='Papá' message='No olvides tu almuerzo' imgNumber={70} />
    </ul>
 )
}
