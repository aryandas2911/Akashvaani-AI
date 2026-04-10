import { useState, useEffect } from 'react';
import { getSchemes } from '../services/api';

export const useSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const result = await getSchemes();
        setSchemes(result.schemes || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch schemes');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return { schemes, loading, error };
};
