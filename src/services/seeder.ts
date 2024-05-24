import { Orm } from './orm'

export const seed = () => {
  Orm.Users.populate([
    {
      id: 1,
      username: 'yo',
      name: 'Carlos Paredes',
      imgSrc: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 2,
      username: 'andres.smith',
      name: 'Andrés Smith',
      imgSrc: `https://i.pravatar.cc/150?img=60`
    },
    {
      id: 3,
      username: 'cynthia.gacitua',
      name: 'Cynthia Gacitúa',
      imgSrc: `https://i.pravatar.cc/150?img=35`
    },
  ])

  Orm.Chats.populate([
    {
      id: 1,
      isGroup: false,
      imgSrc: '',
      title: ''
    },
    {
      id: 2,
      isGroup: false,
      imgSrc: '',
      title: ''
    },
  ])

  Orm.Messages.populate([
    {
      id: 1,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Hola te escribo del banco BICE para invitarte a abrir una cuenta con nosotros',
      hourAndMinutes: '11:50'
    },
    {
      id: 2,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Qué beneficios tiene abrir una cuenta en el banco BICE?',
      hourAndMinutes: '11:51'
    },
    {
      id: 3,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Tenemos una tasa de interés del 2% anual',
      hourAndMinutes: '11:51'
    },
    {
      id: 4,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Qué necesito para abrir una cuenta?',
      hourAndMinutes: '11:53'
    },
    {
      id: 5,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Necesitas tu cédula de identidad y un comprobante de domicilio',
      hourAndMinutes: '11:54'
    },
    {
      id: 6,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Cuánto tiempo se demora en abrir una cuenta?',
      hourAndMinutes: '11:55'
    },
    {
      id: 7,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Se demora aproximadamente 30 minutos',
      hourAndMinutes: '11:56'
    },
    {
      id: 8,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: 'Mmm lo pensaré, gracias por la información',
      hourAndMinutes: '12:10'
    },
    {
      id: 9,
      user: Orm.Users.find(3),
      chat: Orm.Chats.find(2),
      message: '5 papas, 3 tomates, 1 kilo de pan, 3 limones',
      hourAndMinutes: '12:30'
    }, 
  ])

  Orm.ChatMembers.populate([
    {
      id: 1,
      chat: Orm.Chats.find(1),
      user: Orm.Users.find(1),
      isAdmin: false
    },
    {
      id: 2,
      chat: Orm.Chats.find(1),
      user: Orm.Users.find(2),
      isAdmin: false
    },
    {
      id: 3,
      chat: Orm.Chats.find(2),
      user: Orm.Users.find(1),
      isAdmin: false
    },
    {
      id: 4,
      chat: Orm.Chats.find(2),
      user: Orm.Users.find(3),
      isAdmin: false
    },
  ])
}
