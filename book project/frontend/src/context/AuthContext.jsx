import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    const response = await api.post('/login', { email, password });
    setUser(response.data.user);
    setToken(response.data.token);
    setLoading(false);
    return response.data;
  };

  const register = async (name, email, password, passwordConfirmation) => {
    setLoading(true);
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    setUser(response.data.user);
    setToken(response.data.token);
    setLoading(false);
    return response.data;
  };

  const updateProfile = async (profileData) => {
    const response = await api.put('/user', profileData);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
