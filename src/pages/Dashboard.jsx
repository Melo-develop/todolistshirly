import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar tareas desde la API al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva tarea
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      author: user.username,
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await taskAPI.createTask(task);
      setTasks(prev => [task, ...prev]);
      setNewTask('');
      toast.success('✅ Tarea creada');
    } catch (error) {
      console.error('Error al crear tarea:', error);
      toast.error('Error al crear la tarea');
    }
  };

  // Marcar tarea como completada/pendiente
  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = {
      ...task,
      completed: !task.completed,
      updatedAt: new Date().toISOString()
    };

    try {
      await taskAPI.updateTask(id, updatedTask);
      setTasks(prev =>
        prev.map(t => t.id === id ? updatedTask : t)
      );
      toast.success(updatedTask.completed ? '✅ Tarea completada' : '⏳ Tarea marcada como pendiente');
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      toast.error('Error al actualizar la tarea');
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

    try {
      await taskAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('🗑️ Tarea eliminada');
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      toast.error('Error al eliminar la tarea');
    }
  };

  // Iniciar edición de tarea
  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  // Guardar edición de tarea
  const saveEdit = async (id) => {
    if (!editText.trim()) {
      toast.error('El texto de la tarea no puede estar vacío');
      return;
    }

    const task = tasks.find(t => t.id === id);
    const updatedTask = {
      ...task,
      text: editText.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      await taskAPI.updateTask(id, updatedTask);
      setTasks(prev =>
        prev.map(t => t.id === id ? updatedTask : t)
      );
      setEditingTask(null);
      setEditText('');
      toast.success('✏️ Tarea editada');
    } catch (error) {
      console.error('Error al editar tarea:', error);
      toast.error('Error al editar la tarea');
    }
  };

  // Filtrar tareas por búsqueda
  const filteredTasks = tasks.filter(task =>
    task.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">LISTA DE TAREAS</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hola, <strong>{user?.username}</strong></span>
            <Link 
              to="/usuarios" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Buscar Usuarios
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Formulario para crear tareas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nueva Tarea</h2>
          <form onSubmit={handleAddTask} className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition whitespace-nowrap"
            >
              Agregar Tarea
            </button>
          </form>
        </div>

        {/* Buscador de tareas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Buscar Tareas</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por autor o texto de tarea..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lista de tareas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Tareas del Equipo</h2>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              {filteredTasks.length} tareas
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'No se encontraron tareas que coincidan con tu búsqueda' 
                  : 'No hay tareas creadas. ¡Crea la primera!'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 flex justify-between items-start ${
                    task.completed ? 'bg-gray-50 border-gray-300' : 'bg-white border-blue-200'
                  }`}
                >
                  <div className="flex-1">
                    {/* Modo edición */}
                    {editingTask === task.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition text-sm"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Modo visualización */
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <p className={`font-medium text-lg ${
                            task.completed ? 'line-through text-gray-600' : 'text-gray-800'
                          }`}>
                            {task.text}
                          </p>
                          {task.completed && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Completada
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <p className="text-gray-600">
                            por <span className="font-semibold">{task.author}</span>
                          </p>
                          <span className="text-gray-400">
                            {new Date(task.createdAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {task.updatedAt !== task.createdAt && (
                            <span className="text-gray-400 text-xs">
                              (editada)
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Botones de acción - Solo el autor puede editar/eliminar */}
                  {task.author === user.username && editingTask !== task.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`${
                          task.completed 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white px-4 py-2 rounded-lg transition whitespace-nowrap`}
                      >
                        {task.completed ? 'Desmarcar' : 'Completar'}
                      </button>
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Estadísticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-800">
                  {tasks.filter(t => t.completed).length}
                </p>
                <p className="text-sm text-gray-600">Completadas</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-800">
                  {tasks.filter(t => !t.completed).length}
                </p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-800">
                  {tasks.filter(t => t.author === user.username).length}
                </p>
                <p className="text-sm text-gray-600">Mis tareas</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}