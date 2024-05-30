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
      <main className='w-full h-full flex flex-col gap-6 items-center justify-center text-gray-800 dark:text-gray-100 p-6 bg-gray-100 dark:bg-gray-950'>
        <h2 className='text-2xl font-bold'>Documentación de EPA Chat</h2>
        <h3 className='text-lg font-normal'>Aquí encontrarás la explicación detalladas de las funcionalidades de EPA Chat</h3>
        <h2 className='text-xl font-semibold mt-6'>¿Qué funciones tenemos para los adultos mayores?</h2>
        <ul className='text-lg font-normal'>
          <li><a href="#login" onClick={(e) => { e.preventDefault(); scrollToSection('login') }} className="block">- Cómo entrar a tu cuenta de EPA Chat</a></li>
          <li><a href="#sign_up" onClick={(e) => { e.preventDefault(); scrollToSection('sign_up') }} className="block">- Cómo registrarse en EPA Chat</a></li>
          <li><a href="#enviar_mensaje" onClick={(e) => { e.preventDefault(); scrollToSection('enviar_mensaje') }} className="block">- Cómo enviar un mensaje en EPA Chat</a></li>
          <li><a href="#agrandar_mensajes" onClick={(e) => { e.preventDefault(); scrollToSection('agrandar_mensajes') }} className="block">- Agrandar mensajes</a></li>
          <li><a href="#escuchar_mensajes_escritos" onClick={(e) => { e.preventDefault(); scrollToSection('escuchar_mensajes_escritos') }} className="block">- Escuchar mensajes escritos</a></li>
          {/*<li><a href="#transformar_audio_texto" onClick={(e) => { e.preventDefault(); scrollToSection('transformar_audio_texto'); }} className="block">- Transformar audio a texto para poder enviar mensajes en caso de que sea difícil escribir en el teclado</a></li>*/}
        </ul>
        <div id="login"></div>
        <ExplanationCard title="Cómo entrar a tu cuenta de EPA Chat" text={'1) Ir a la barra de navegación y presionar en el logo EPA Chat.<div />2) Bajar hasta el final de la página hasta encontrar el botón de Iniciar Sesión.<div />3) Introducir telefono y contraseña, y presionar en Iniciar Sesión.'} images={['assets/views/navbar_epachat.png', 'assets/views/login_button.png', 'assets/views/login.png']} />
        <div id="sign_up"></div>
        <ExplanationCard title="Cómo registrarse en EPA Chat" text={'1) Ir a la barra de navegación y presionar en el logo EPA Chat.<div />2) Bajar hasta el final de la página hasta encontrar el botón de Registrarse.<div />3) Introducir telefono y contraseña, y presionar en Registrarse.'} images={['assets/views/navbar_epachat.png', 'assets/views/sign_up_button.png', 'assets/views/login.png']} />
        <div id="enviar_mensaje"></div>
        <ExplanationCard title="Cómo enviar un mensaje en EPA Chat" text={'1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Presionar sodive Escribe un mensaje... <div />4) Escribir el mensaje.<div />5) Presionar el botón Enviar para enviar el mensaje. '} images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/write_message.png', 'assets/views/example_message.png', 'assets/views/send_message.png']} />
        <div id="agrandar_mensajes"></div>
        <ExplanationCard title="Agrandar mensajes" text={'1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Al mantener presionado un mensaje cualquiera, este se agrandará.'} images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/big_chat.png']} />
        <div id="escuchar_mensajes_escritos"></div>
        <ExplanationCard title="Escuchar mensajes escritos" text={'1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Al hacer click sodive un mensaje, una voz lo leerá.'} images={['assets/views/navbar_chat.png', 'assets/views/chat_capture.png', 'assets/views/voice_chat.png']} />
        <div id="transformar_audio_texto"></div>
        {/*<ExplanationCard title="Transformar audio a texto" text={"1) Ir a la barra de navegación y presionar en chats.<div />2) Elegir el chat que desee.<div />3) Al hacer click sodive un mensaje, una voz lo leerá."} images={["assets/views/navbar_chat.png", "assets/views/chat_capture.png", "assets/views/voice_chat.png"]} /> */}
      </main>
    </Layout>
  )
}
