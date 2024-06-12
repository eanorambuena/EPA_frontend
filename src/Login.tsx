import React, { useState } from 'react';
import axios from 'axios';
import SubmitButton from './components/SubmitButton';
import Layout from './Layout';

interface Props {
  searchParams?: { message: string };
}

// Definición de la función Login sin usar React.FC
function Login({ searchParams }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(phone)
    console.log(password)
    const config_post = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: `http://localhost:3000/users`,
      data: { 'phoneNumber': phone, 'password': password }
    }

    try {
      const response_post = await axios(config_post);
      console.log('Usuario registrado:', response_post.data);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <Layout>
      <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen'>
        <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
          <label className='text-md' htmlFor='phone'>
            Teléfono
          </label>
          <input
            type='tel'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='phone'
            placeholder='+56912345678'
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className='text-md' htmlFor='password'>
            Contraseña
          </label>
          <input
            type='password'
            className='rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300'
            name='password'
            placeholder='••••••••'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton className='mb-2'>Iniciar Sesión</SubmitButton>
          <button
            className='bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2'
            onClick={handleRegister}
          >
            Registrarse
          </button>
          {/* mensaje de error si es necesario */}
          {searchParams?.message && (
            <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </Layout>
  );
}

export default Login;
