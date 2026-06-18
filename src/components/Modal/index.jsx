import React, { useState } from 'react';
import ReactModal from 'react-modal';
import api from '../../services/api';
import style from './main.module.css';

export const Modal = ({ isOpen, onRequestClose }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/rendezvous/', { key: key });
      onRequestClose();
    } catch (err) {
      setError('Erro ao conectar. Verifique a chave e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      overlayClassName={style.modalOverlay}
      className={style.modal}>
      <span className={style['modal-text']}>
        Para visualizar a aplicação criada no App Inventor, digite a chave de 6
        caracteres no campo abaixo
      </span>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <input
            type="text"
            name="key"
            id="key"
            value={key}
            placeholder="Chave de 6 caracteres"
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        {error && <span className={style.error}>{error}</span>}
        <button type="submit" disabled={loading}>
          {loading ? 'Conectando...' : 'Conectar'}
        </button>
      </form>
    </ReactModal>
  );
};
