import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from './hooks/useLocalStorage';
import ToastContext from './hooks/useToast';
import Layout from './Layout';
import { UserSchema } from './services/schema';
import { API_URL } from './services/variables';
import useAuthentication from './hooks/useAuthentication';
import useUser, { AllUsersInfo } from './hooks/useUsers';

interface Props {
  className?: string;
}

export default function AdminPage({ className }: Props) {
  const authentication = useAuthentication();
  const navigate = useNavigate();
  const setAccessToken = useLocalStorage('accessToken', '')[1];
  const toast = useContext(ToastContext);
  
  const { users, fetchAllUsers, deleteUser }: AllUsersInfo = useUser();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await fetchAllUsers();
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    getUsers();
  }, [fetchAllUsers]);

  if (loading) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${className}`}>
        <p className='text-lg font-bold'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${className}`}>
        <p className='text-lg font-bold'>{error}</p>
      </div>
    );
  }

  return (
    <Layout limitHeight={false}>
      <div className={`h-full items-center flex flex-col items-start justify-start ${className}`}>
      <h1 className='text-lg font-bold text-center w-full'>Panel de administrador</h1>
      <br />
      <h2 className='text-lg font-bold text-center w-full'>Mensaje a la comunidad</h2>
      <br />
      <input
            type='text'
            placeholder='Escribe un mensaje para todos los usuarios...'
            className='p-2 border rounded-md w-full'
      />
      <br />
      <button className='bg-[#a78bfa] text-white rounded-md px-4 py-2 hover:bg-[#7c66db] transition'>
        Enviar mensaje
      </button>
      <br />
        <div className='flex items-center justify-between w-full p-4 bg-gray-100'>
        <h2 className='text-lg font-bold text-center w-full'>Lista de usuarios</h2>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border p-2'>ID</th>
                <th className='border p-2'>Phone Number</th>
                <th className='border p-2'>Type</th>
                <th className='border p-2'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className='border p-2'>{user.id}</td>
                  <td className='border p-2'>{user.phoneNumber}</td>
                  <td className='border p-2'>{user.type}</td>
                  <td className='bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition'>Eliminar usuario</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
