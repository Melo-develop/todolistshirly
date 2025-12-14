import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials);
      if (response.data.length > 0) {
        setUser(response.data[0]);
        toast.success(`¡Bienvenido ${response.data[0].username}!`);
        return true;
      } else {
        toast.error('Credenciales incorrectas');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);