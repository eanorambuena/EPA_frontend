import { Orm } from './orm'
import { Status } from './schema'

export const seed = () => {
  const getRandomStatus = () => Math.random() > 0.5 ? Status.online : Status.offline

  Orm.Users.populate([
    {
      id: 1,
      username: 'yo',
      name: 'Carlos Paredes',
      imgSrc: 'https://i.pravatar.cc/150?img=11',
      status: getRandomStatus()
    },
    {
      id: 2,
      username: 'andres.smith',
      name: 'Andrés Smith',
      imgSrc: 'https://i.pravatar.cc/150?img=60',
      status: getRandomStatus()
    },
    {
      id: 3,
      username: 'cynthia.gacitua',
      name: 'Cynthia Gacitúa',
      imgSrc: 'https://i.pravatar.cc/150?img=35',
      status: getRandomStatus()
    },
    {
      id: 4,
      username: 'josefa.martinez',
      name: 'Josefa Martínez',
      imgSrc: 'https://i.pravatar.cc/150?img=10',
      status: getRandomStatus()
    }
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
    {
      id: 3,
      isGroup: true,
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Asadito.jpg/1200px-Asadito.jpg',
      title: 'Asado Familiar'
    },
  ])

  Orm.Messages.populate([
    {
      id: 1,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Hola te escribo del banco BICE para invitarte a abrir una cuenta con nosotros',
      createdAt: '11:50'
    },
    {
      id: 2,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Qué beneficios tiene abrir una cuenta en el banco BICE?',
      createdAt: '11:51'
    },
    {
      id: 3,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Tenemos una tasa de interés del 2% anual',
      createdAt: '11:51'
    },
    {
      id: 4,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Qué necesito para abrir una cuenta?',
      createdAt: '11:53'
    },
    {
      id: 5,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Necesitas tu cédula de identidad y un comprobante de domicilio',
      createdAt: '11:54'
    },
    {
      id: 6,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: '¿Cuánto tiempo se demora en abrir una cuenta?',
      createdAt: '11:55'
    },
    {
      id: 7,
      user: Orm.Users.find(2),
      chat: Orm.Chats.find(1),
      message: 'Se demora aproximadamente 30 minutos',
      createdAt: '11:56'
    },
    {
      id: 8,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(1),
      message: 'Mmm lo pensaré, gracias por la información',
      createdAt: '12:10'
    },
    {
      id: 9,
      user: Orm.Users.find(3),
      chat: Orm.Chats.find(2),
      message: '5 papas, 3 tomates, 1 kilo de pan, 3 limones',
      createdAt: '12:30'
    },
    {
      id: 10,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(3),
      message: '¿A qué hora es el asado?',
      createdAt: '13:00'
    },
    {
      id: 11,
      user: Orm.Users.find(4),
      chat: Orm.Chats.find(3),
      message: 'A las 15:00',
      createdAt: '13:01'
    },
    {
      id: 12,
      user: Orm.Users.find(3),
      chat: Orm.Chats.find(3),
      message: 'Esa es todas las anteriores',
      createdAt: '13:02'
    },
    {
      id: 13,
      user: Orm.Users.find(4),
      chat: Orm.Chats.find(3),
      message: 'Graciaas',
      createdAt: '13:03'
    },
    {
      id: 14,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(3),
      message: '¿Qué traerás a las 10?',
      createdAt: '13:04'
    },
    {
      id: 15,
      user: Orm.Users.find(3),
      chat: Orm.Chats.find(3),
      message: 'Llevaré el Carbón',
      createdAt: '13:05'
    },
    {
      id: 16,
      user: Orm.Users.find(1),
      chat: Orm.Chats.find(3),
      message: 'Ok',
      createdAt: '13:08'
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
    {
      id: 5,
      chat: Orm.Chats.find(3),
      user: Orm.Users.find(1),
      isAdmin: true
    },
    {
      id: 6,
      chat: Orm.Chats.find(3),
      user: Orm.Users.find(4),
      isAdmin: false
    },
    {
      id: 7,
      chat: Orm.Chats.find(3),
      user: Orm.Users.find(3),
      isAdmin: false
    }
  ])
}
