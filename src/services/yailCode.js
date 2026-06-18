import api from '../services/api';

const getYAIL = async () => {
  try {
    const res = await api.get('/data');
    const message = res.data;

    if (
      message.status === 'NEW' &&
      message.yail.startsWith('(try-catch (let ((attempt (delay')
    ) {
      return message.yail;
    }

    return null;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[LIDEA-w] Erro ao buscar YAIL:', err.message);
    }
    return null;
  }
};

export { getYAIL };
