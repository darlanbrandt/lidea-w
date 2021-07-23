import api from '../services/api';

const getYAIL = async () => {
  /* Fetch data from API */
  const res = await api.get('/data');
  const yail = await res.data;

  return yail;
};

export { getYAIL };
