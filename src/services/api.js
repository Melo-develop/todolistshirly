import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Usar variable de entorno
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error('Error de conexión con el servidor');
    return Promise.reject(error);
  }
);

export const taskAPI = {
  getTasks: () => API.get('/tasks'),
  createTask: (task) => API.post('/tasks', task),
  updateTask: (id, task) => API.put(`/tasks/${id}`, task), // ← Cambié PATCH a PUT
  deleteTask: (id) => API.delete(`/tasks/${id}`),
};

export const authAPI = {
  login: async (credentials) => {
    // Primero buscar por usuario
    const response = await API.get('/users', { 
      params: { 
        username: credentials.username,
        password: credentials.password // ← Pasar password también
      } 
    });
    
    // Tu backend Express ya filtra por username y password
    return { 
      data: response.data
    };
  },
};