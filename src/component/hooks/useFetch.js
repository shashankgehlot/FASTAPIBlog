// src/hooks/useFetch.js
import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'GET', body = null, contentType = 'application/json') => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': contentType, // Use the passed content type
        },
      };
      if (body) {
        options.body = body; // Set the body if provided
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
