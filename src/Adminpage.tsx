import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './Layout';
import useUser, { AllUsersInfo } from './hooks/useUsers';
import useAuthentication from './hooks/useAuthentication';
import useCurrentUserOncePerContext from './hooks/useCurrentUserOncePerContext';
import axios from 'axios';
import useSafeRequest from './hooks/useSafeRequest';
import { API_URL } from './services/variables';

interface Props {
  className?: string;
}

export default function AdminPage({ className }: Props) {
  const navigate = useNavigate();
  const authentication = useAuthentication();
  const currentuser = useCurrentUserOncePerContext();
  const [accessToken] = useLocalStorage('accessToken', '');
  const { users, fetchAllUsers, deleteUser }: AllUsersInfo = useUser();
  const safeRequest = useSafeRequest()
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

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

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      setMessage('Usuario eliminado exitosamente');
      await fetchAllUsers();
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el usuario');
    }
  };

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

  const filteredUsers = users.filter(user => 
    user.phoneNumber.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout limitHeight={false}>
      <div className={`h-full items-center flex flex-col items-start justify-start ${className}`}>
        <h1 className='text-lg font-bold text-center w-full'>Panel de administrador</h1>
        <br />
        <h2 className='text-lg font-bold text-center w-full'>Mensaje a la comunidad</h2>
        <br />
        <textarea
          placeholder='Escribe un mensaje para todos los usuarios...'
          className='p-2 border rounded-md w-full'
        />
        <br />
        <button className='bg-[#a78bfa] text-white rounded-md px-4 py-2 hover:bg-[#7c66db] transition'>
          Enviar mensaje
        </button>
        <br />
        {message && <p className='text-red-500'>{message}</p>}
        <div className='flex items-center justify-between w-full p-4 bg-gray-100'>
          <h2 className='text-lg font-bold text-center w-full'>Lista de usuarios</h2>
        </div>
        <input
          type='text'
          placeholder='Filtrar por número de teléfono...'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='p-2 border rounded-md w-full'
        />
        <br />
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border p-2'>ID</th>
                <th className='border p-2'>Número de telefono</th>
                <th className='border p-2'>Tipo</th>
                <th className='border p-2'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className='border p-2'>{user.id}</td>
                  <td className='border p-2'>{user.phoneNumber}</td>
                  <td className='border p-2'>{user.type}</td>
                  <td className='border p-2'>
                    <button 
                      className='bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Eliminar usuario
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
