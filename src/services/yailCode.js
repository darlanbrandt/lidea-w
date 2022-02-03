import api from '../services/api';

const getYAIL = async () => {
  /* Fetch data from API */
  const res = await api.get('/data');
  const message = await res.data;

  if (
    message.status === 'NEW'
    // para receber apenas o YAIL inicial. para receber qualquer atualização, remover linha abaixo
    //&& message.yail.startsWith('(try-catch (let ((attempt (delay')
  ) {
    return message.yail;
  }

  return null;
};

export { getYAIL };
