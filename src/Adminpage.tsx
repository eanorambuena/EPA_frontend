import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubmitButton from './components/SubmitButton';
import useLocalStorage from './hooks/useLocalStorage';
import ToastContext, { ToastType } from './hooks/useToast';
import Layout from './Layout';
import { Auth, UserSchema, UserType } from './services/schema';
import { API_URL } from './services/variables';

interface Props {
  className?: string;
}

export default function AdminPage({ className }: Props) {
  const navigate = useNavigate();
  const setAccessToken = useLocalStorage('accessToken', '')[1];
  const toast = useContext(ToastContext);
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleLogout = () => {
    Auth.logout();
    navigate('/login');
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

  return (
    <Layout>
      <div className={`h-full flex flex-col items-start justify-start ${className}`}>
        <div className='flex items-center justify-between w-full p-4 bg-gray-100'>
          <h1 className='text-lg font-bold'>Lista de Usuarios</h1>
          <button
            className='bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border p-2'>ID</th>
                <th className='border p-2'>Phone Number</th>
                <th className='border p-2'>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className='border p-2'>{user.id}</td>
                  <td className='border p-2'>{user.phoneNumber}</td>
                  <td className='border p-2'>{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
