import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://animated-goggles-49x7jg5qgw43qgv7-80.app.github.dev';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        setData(response.data.data[0]);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData