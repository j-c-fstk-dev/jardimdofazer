import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      setLoading(true);
      const response = await api.verifyAuth();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token inválido:', error);
      setUser(null);
      setIsAuthenticated(false);
      api.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.login(email, password);
      
      api.setToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);

      return { success: true, message: 'Login realizado!' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    verifyToken
  };
};
