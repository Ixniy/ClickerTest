import axios from 'axios';
const API_URL = 'https://humble-space-couscous-g9pj69rr4w397vq-80.app.github.dev';

export const putData = async (endpoint, postData) => {
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, postData, {
        headers: {
            'Content-type': 'application/json',
        }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error posting data');
  }
};

export const postData = async (endpoint, postData) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, postData, {
        headers: {
            'Content-type': 'application/json',
        }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error posting data');
  }
};


