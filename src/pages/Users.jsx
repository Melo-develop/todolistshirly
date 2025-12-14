import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = axios.create({
  baseURL: 'http://localhost:4000',
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="min-h-screen flex-center bg-gradient-to-br from-pastel-pink/20 via-pastel-blue/20 to-pastel-purple/20">
        <div className="flex-center gap-3">
          <div className="loading-spinner-pastel"></div>
          <span className="text-gray-600">Cargando usuarios...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/20 via-pastel-blue/20 to-pastel-purple/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-pastel p-6 mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Buscar Usuarios</h1>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar usuarios por nombre..."
            className="input-pastel mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className={`card-pastel p-4 ${
                  user.id === currentUser?.id ? 'border-2 border-pastel-purple' : ''
                }`}
              >
                <div className="flex-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
                    <p className="text-gray-600 text-sm">ID: {user.id}</p>
                  </div>
                  {user.id === currentUser?.id && (
                    <span className="badge-pastel badge-success-pastel">
                      Tú
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="empty-state-pastel">
              <div className="text-4xl mb-4"></div>
              <p>No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}