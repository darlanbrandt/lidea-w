import api from '../services/api';

const getYAIL = async () => {
  /* Buscar dados da API */
  const res = await api.get('/data');
  const message = await res.data;

  if (
    message.status === 'NEW' &&
    // Para receber apenas o YAIL inicial. para receber qualquer atualização, remover linha abaixo
    message.yail.startsWith('(try-catch (let ((attempt (delay')
  ) {
    return message.yail;
  }

  return null;
};

export { getYAIL };
