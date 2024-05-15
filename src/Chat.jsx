import ChatBubble from "./ChatBubble"

export default function Chat() {
  const userImgNumber = 60
  const me = {
    username: 'Yo',
    imgSrc: 'https://i.pravatar.cc/150?img=11'
  }
  const you = {
    username: 'Andrés Smith',
    imgSrc: `https://i.pravatar.cc/150?img=${userImgNumber}`
  }

  const users = {
    [me.username]: me,
    [you.username]: you
  }

  const messages = [
    {
      id: 1,
      username: you.username,
      message: 'Hola te escribo del banco BICE para invitarte a abrir una cuenta con nosotros',
      hourAndMinutes: '11:50'
    },
    {
      id: 2,
      username: me.username,
      message: '¿Qué beneficios tiene abrir una cuenta en el banco BICE?',
      hourAndMinutes: '11:51'
    },
    {
      id: 3,
      username: you.username,
      message: 'Tenemos una tasa de interés del 2% anual',
      hourAndMinutes: '11:51'
    },
    {
      id: 4,
      username: me.username,
      message: '¿Qué necesito para abrir una cuenta?',
      hourAndMinutes: '11:53'
    },
    {
      id: 5,
      username: you.username,
      message: 'Necesitas tu cédula de identidad y un comprobante de domicilio',
      hourAndMinutes: '11:54'
    },
    {
      id: 6,
      username: me.username,
      message: '¿Cuánto tiempo se demora en abrir una cuenta?',
      hourAndMinutes: '11:55'
    },
    {
      id: 7,
      username: you.username,
      message: 'Se demora aproximadamente 30 minutos',
      hourAndMinutes: '11:56'
    },
    {
      id: 8,
      username: me.username,
      message: 'Mmm lo pensaré, gracias por la información',
      hourAndMinutes: '12:10'
    }
  ]

  return (
    <section className='flex flex-col gap-6 flex-reverse overflow-y-auto p-4 sm:p-6 bg-amber-100'>
      {
        messages.map((message) => (
          <ChatBubble key={message.id} me={message.username === me.username} {...users[message.username]} message={message.message} hourAndMinutes={message.hourAndMinutes} />
        ))
      }
    </section>
  )
}