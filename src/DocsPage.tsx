import ExplanationCard from './components/ExplanationCard'
import React from 'react'
import Layout from './Layout'

export default function DocsPage() {
  const scrollToSection = (id) => {
    const $section = document.getElementById(id)
    if (!$section)
      return
    $section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Layout limitHeight={false}>
      <main className='w-full h-full flex flex-col gap-6 py-6 items-center justify-center text-gray-800 dark:text-gray-100 p-6'>
        <h2 className='text-2xl font-bold'>
          Documentación de EPA Chat
        </h2>
        <h3 className='text-lg font-normal'>
          Aquí encontrarás la explicación detalladas de las funcionalidades de EPA Chat
        </h3>
        <h2 className='text-xl font-semibold mt-6'>
          ¿Qué funciones tenemos para los adultos mayores?
        </h2>
        <ul className='text-lg font-normal'>
          <li>
            <a
              className='block'
              href='#login'
              onClick={(e) => { e.preventDefault(); scrollToSection('login') }}
            >
              - Cómo entrar a tu cuenta de EPA Chat
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#sign_up'
              onClick={(e) => { e.preventDefault(); scrollToSection('sign_up') }}
            >
              - Cómo registrarse en EPA Chat
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#enviar_mensaje'
              onClick={(e) => { e.preventDefault(); scrollToSection('enviar_mensaje') }}
            >
              - Cómo enviar un mensaje en EPA Chat
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#agrandar_mensajes'
              onClick={(e) => { e.preventDefault(); scrollToSection('agrandar_mensajes') }}
            >
              - Agrandar mensajes
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#escuchar_mensajes_escritos'
              onClick={(e) => { e.preventDefault(); scrollToSection('escuchar_mensajes_escritos') }}
            >
              - Escuchar mensajes escritos
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#editar_perfil'
              onClick={(e) => { e.preventDefault(); scrollToSection('editar_perfil') }}
            >
              - Editar perfil
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#eliminar_usuario'
              onClick={(e) => { e.preventDefault(); scrollToSection('eliminar_usuario') }}
            >
              - Eliminar usuario
            </a>
          </li>
          <li>
            <a
              className='block'
              href='#cómo_usar_docs'
              onClick={(e) => { e.preventDefault(); scrollToSection('cómo_usar_docs') }}
            >
              - Cómo usar la documentación
            </a>
          </li>
        </ul>
        <div id='login'></div>
        <ExplanationCard
          images={['assets/views/navbar_epachat.png', 'assets/views/login_button.png', 'assets/views/login.png']}
          text='1) Ir a la barra de navegación y presionar en el logo EPA Chat.<div />2) Bajar hasta el final de la página hasta encontrar el botón de Iniciar Sesión.<div />3) Introducir telefono y contraseña, y presionar en Iniciar Sesión.'
          title='Cómo entrar a tu cuenta de EPA Chat'
        />
        <div id='sign_up'></div>
        <ExplanationCard
          images={['assets/views/navbar_epachat.png', 'assets/views/sign_up_button.png', 'assets/views/login.png']}
          text='1) Ir a la barra de navegación y presionar en el logo EPA Chat.<div />2) Bajar hasta el final de la página hasta encontrar el botón de Registrarse.<div />3) Introducir telefono y contraseña, y presionar en Registrarse.'
          title='Cómo registrarse en EPA Chat'
        />
        <div id='enviar_mensaje'></div>
        <ExplanationCard
          images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/write_message.png', 'assets/views/example_message.png', 'assets/views/send_message.png']}
          text='1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Presionar sobre Escribe un mensaje... <div />4) Escribir el mensaje.<div />5) Presionar el botón Enviar para enviar el mensaje. '
          title='Cómo enviar un mensaje en EPA Chat'
        />
        <div id='agrandar_mensajes'></div>
        <ExplanationCard
          images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/big_chat.png']}
          text='1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Al mantener presionado un mensaje cualquiera, este se agrandará.'
          title='Agrandar mensajes'
        />
        <div id='escuchar_mensajes_escritos'></div>
        <ExplanationCard
          images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/voice_chat.png']}
          text='1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Al hacer click sobre un mensaje, una voz lo leerá.'
          title='Escuchar mensajes escritos'
        />
        <div id='editar_perfil'></div>
        <ExplanationCard
          images={['assets/views/navbar_perfil.png', 'assets/views/perfil_editar.png', 'assets/views/perfil_editar_boton.png']}
          text='1) Ir a la barra de navegación y presionar en perfil.<div />2) Elegir el atributo a editar y escribir lo deseado.<div />3) Al hacer click sobre Actualizar perfil.'
          title='Editar perfil'
        />
        <div id='eliminar_usuario'></div>
        <ExplanationCard
          images={['assets/views/navbar_perfil.png', 'assets/views/perfil_eliminar.png']}
          text='1) Ir a la barra de navegación y presionar en perfil.<div />2) Hacer click en Eliminar Cuenta.'
          title='Eliminar usaurio'
        />
        <div id='cómo_usar_docs'></div>
        <ExplanationCard
          images={['assets/views/navbar_docs.png', 'assets/views/seleccionar_docs.png', 'assets/views/explanation_doc.png', 'assets/views/carrusel_doc.png']}
          text='1) Ir a la barra de navegación y presionar en Docs.<div />2) Hacer click en la instrucción que deseamos conocer.<div />3) Esto nos llevará hacía la información correspondiente.<div />4) Hacer click en las flechas para ver las imagenes explicativas.'
          title='Cómo usar la documentación'
        />
      </main>
    </Layout>
  )
}
