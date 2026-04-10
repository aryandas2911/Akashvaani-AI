import { useState, useEffect, useCallback } from 'react';
import { getSchemes } from '../services/api';

export const useSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getSchemes();
      setSchemes(result.schemes || result || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch schemes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  return { schemes, loading, error, refetch: fetchSchemes };
};
