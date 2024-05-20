import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err?.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    if (err?.response?.data?.messages) {
      throw new Error(err.response.data.messages);
    }
    throw new Error('Unknown API error.');
  },
);

export default api;
