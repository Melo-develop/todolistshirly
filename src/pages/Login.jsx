import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login-container-pastel">
      <div className="login-card-pastel animate-slide-in">
        <h1 className="text-3xl font-bold text-center mb-8 text-pastel-purple">LISTA DE TAREAS</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input-pastel"
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="form-label block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input-pastel"
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="login-button-pastel"
          >
            {loading ? (
              <div className="flex-center gap-2">
                <div className="loading-spinner-pastel"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Usa cualquier usuario y contraseña para ingresar
        </p>
      </div>
    </div>
  );
}