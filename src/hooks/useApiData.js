// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'https://animated-goggles-49x7jg5qgw43qgv7-80.app.github.dev';

// const useFetchData = (endpoint) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}${endpoint}`);
//         setData(response.data.data[0]);
//       } catch (err) {
//         setError(err.message || 'Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint]);

//   return { data, loading, error };
// };

// export default useFetchData

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://verbose-bassoon-v7xv6g9647xh6r-80.app.github.dev';

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
          ...prev.newData
        }
      }));
  }

  return { userData, loading, error, updateUserData };
};

export default useApiData