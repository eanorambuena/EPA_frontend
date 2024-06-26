import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { UserSchema } from '../services/schema';
import { API_URL } from '../services/variables';
import useAuthentication from './useAuthentication';
import useSafeRequest from './useSafeRequest';

export type UserInfo = {
  user: UserSchema | null;
  fetchUser: (userId?: number) => void;
};

export type AllUsersInfo = {
  users: UserSchema[];
  fetchAllUsers: () => void;
  deleteUser: (userId: number) => void;
};

export default function useUser(userId?: number): UserInfo & AllUsersInfo {
  const authentication = useAuthentication();
  const safelyRequest = useSafeRequest();
  const [user, setUser] = useState<UserSchema | null>(null);
  const [users, setUsers] = useState<UserSchema[]>([]);

  const fetchUser = useCallback(async (id?: number) => {
    const userIdToFetch = id ?? userId;
    if (!userIdToFetch || userIdToFetch < 0) {
      return;
    }
    const userResponse = await safelyRequest(async () =>
      await axios.get(`${API_URL}/users/${userIdToFetch}`, authentication)
    );
    if (userResponse) {
      setUser(userResponse.data);
    }
  }, [authentication, safelyRequest, userId]);

  const fetchAllUsers = useCallback(async () => {
    const usersResponse = await safelyRequest(async () =>
      await axios.get(`${API_URL}/users`, authentication)
    );
    if (usersResponse) {
      setUsers(usersResponse.data);
    }
  }, [authentication, safelyRequest]);

  const deleteUser = useCallback(async (userId: number) => {
    const response = await safelyRequest(async () =>
      await axios.delete(`${API_URL}/users/${userId}`, authentication)
    );
    if (response) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  }, [authentication, safelyRequest]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, fetchUser, users, fetchAllUsers, deleteUser };
}
