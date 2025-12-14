import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'http://localhost:4000',
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
  updateTask: (id, task) => API.patch(`/tasks/${id}`, task),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
};

export const authAPI = {
  login: async (credentials) => {
    // Primero buscar por usuario
    const response = await API.get('/users', { 
      params: { username: credentials.username } 
    });
    
    // Verificar si se encontró el usuario y si la contraseña coincide
    const user = response.data.find(u => u.password === credentials.password);
    
    // Devolver un objeto que simule la respuesta de la API
    return { 
      data: user ? [user] : [] 
    };
  },
};