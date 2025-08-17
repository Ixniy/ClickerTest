import { useState, useEffect } from 'react';
import axios from 'axios';

export const API_URL = 'https://bug-free-pancake-74g9vr6vqj7hrjv4-80.app.github.dev';

const useApiData = (user) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/users/${user?.id}/`);
        
        if (response.data) {
          setUserData(response.data);
        } else {
          await createUser();
        }
      } catch (error) {
        if (error.response?.status === 404) {
          await createUser();
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    const createUser = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/users/`, {
          id: user?.id,
          username: user?.username,
          // Другие обязательные поля
        });
        setUserData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    if (user?.id) fetchUser();
  }, [user?.id, user?.username]);

  const updateUserData = (newData) => {
     setUserData(prev => ({
        ...prev,
        data: { 
          ...prev?.data,
          ...newData,
        }
      }));
  }

  return { userData, loading, error, updateUserData };
};

export default useApiData