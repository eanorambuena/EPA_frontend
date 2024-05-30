import ExplanationCard from './components/ExplanationCard/ExplanationCard';
import React from 'react';
import Layout from './Layout';

export default function DocsPage() {
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Layout limitHeight={false}>
            <main className='w-full h-full flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-50'>
                <h2 className='text-2xl font-bold text-gray-500'>Docs Page</h2>
                <br></br>
                <h3 className='text-lg font-normal text-gray-500'>Aquí encontrarás la explicación detalladas de las funcionalidades de EPA Chat</h3>
                <br></br>
                <h2 className='text-xl font-semibold mt-6 text-gray-500'>¿Qué funciones tenemos para los adultos mayores?</h2>
                <br></br>
                <ul className='text-lg font-normal text-gray-500'>
                    <li><a href="#login" onClick={(e) => { e.preventDefault(); scrollToSection('login'); }} className="block">- Como entrar a tu cuenta de EPA Chat</a></li>
                    <li><a href="#sign_up" onClick={(e) => { e.preventDefault(); scrollToSection('sign_up'); }} className="block">- Como registrarse en EPA Chat</a></li>
                    <li><a href="#enviar_mensaje" onClick={(e) => { e.preventDefault(); scrollToSection('enviar_mensaje'); }} className="block">- Como enviar un mensaje en EPA Chat</a></li>
                    <li><a href="#agrandar_mensajes" onClick={(e) => { e.preventDefault(); scrollToSection('agrandar_mensajes'); }} className="block">- Agrandar mensajes</a></li>
                    <li><a href="#escuchar_mensajes_escritos" onClick={(e) => { e.preventDefault(); scrollToSection('escuchar_mensajes_escritos'); }} className="block">- Escuchar mensajes escritos</a></li>
                    {/*<li><a href="#transformar_audio_texto" onClick={(e) => { e.preventDefault(); scrollToSection('transformar_audio_texto'); }} className="block">- Transformar audio a texto para poder enviar mensajes en caso de que sea difícil escribir en el teclado</a></li>*/}
                </ul>
                <br id="login"></br>
                <ExplanationCard color="#a78bfa" title="Como entrar a tu cuenta de EPA Chat" text={"1) Ir a la barra de navegación y presionar en el logo EPA Chat.<br />2) Bajar hasta el final de la página hasta encontrar el botón de Iniciar Sesión.<br />3) Introducir telefono y contraseña, y presionar en Iniciar Sesión."} images={["assets/views/navbar_epachat.png", "assets/views/login_button.png", "assets/views/login.png"]} />
                <br id="sign_up"></br>
                <ExplanationCard color="#a78bfa" title="Como registrarse en EPA Chat" text={"1) Ir a la barra de navegación y presionar en el logo EPA Chat.<br />2) Bajar hasta el final de la página hasta encontrar el botón de Registrarse.<br />3) Introducir telefono y contraseña, y presionar en Registrarse."} images={["assets/views/navbar_epachat.png", "assets/views/sign_up_button.png", "assets/views/login.png"]} />
                <br id="enviar_mensaje"></br>
                <ExplanationCard color="#a78bfa" title="Como enviar un mensaje en EPA Chat" text={"1) Ir a la barra de navegación y presionar en chats.<br />2) Elegir el chat que desee.<br />3) Presionar sobre Escribe un mensaje... <br />4) Escribir el mensaje.<br />5) Presionar el botón Enviar para enviar el mensaje. "} images={["assets/views/navbar_chat.png", "assets/views/chat_capture.png", "assets/views/write_message.png", "assets/views/example_message.png", "assets/views/send_message.png"]} />
                <br id="agrandar_mensajes"></br>
                <ExplanationCard color="#a78bfa" title="Agrandar mensajes" text={"1) Ir a la barra de navegación y presionar en chats.<br />2) Elegir el chat que desee.<br />3) Al mantener presionado un mensaje cualquiera, este se agrandará."} images={["assets/views/navbar_chat.png", "assets/views/chat_capture.png", "assets/views/big_chat.png"]} />
                <br id="escuchar_mensajes_escritos"></br>
                <ExplanationCard color="#a78bfa" title="Escuchar mensajes escritos" text={"1) Ir a la barra de navegación y presionar en chats.<br />2) Elegir el chat que desee.<br />3) Al hacer click sobre un mensaje, una voz lo leerá."} images={["assets/views/navbar_chat.png", "assets/views/chat_capture.png", "assets/views/voice_chat.png"]} />
                <br id="transformar_audio_texto"></br>
                {/*<ExplanationCard color="#a78bfa" title="Transformar audio a texto" text={"1) Ir a la barra de navegación y presionar en chats.<br />2) Elegir el chat que desee.<br />3) Al hacer click sobre un mensaje, una voz lo leerá."} images={["assets/views/navbar_chat.png", "assets/views/chat_capture.png", "assets/views/voice_chat.png"]} /> */}
            </main>
        </Layout>
    );
}
