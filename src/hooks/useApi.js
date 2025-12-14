import { useState } from 'react';
import { toast } from 'react-toastify';

export function useApi(apiFunction, initialData = []) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error('Error en la petición');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}