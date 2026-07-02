import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import ContentContext from '../../context/ContentContext';
import api from '../../services/api';
import style from './main.module.css';

export const Modal = ({ isOpen, onRequestClose }) => {
  const { connect } = useContext(ContentContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function sanitize(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  }

  function handleClose() {
    if (!loading) {
      setError('');
      onRequestClose();
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (code.length !== 6) return;
    setError('');
    setLoading(true);
    try {
      await api.post('/rendezvous/', { key: code });
      connect();
      setCode('');
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
      onRequestClose={handleClose}
      appElement={document.getElementById('root')}
      overlayClassName={style.modalOverlay}
      className={style.modal}>
      <button className={style['close-btn']} onClick={handleClose} aria-label="Fechar">×</button>

      <h2 className={style.title}>Conectar sessão</h2>
      <p className={style['modal-text']}>
        Digite a chave de 6 caracteres exibida no App Inventor para visualizar sua aplicação.
      </p>

      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="code"
          id="code"
          value={code}
          placeholder="000000"
          maxLength={6}
          onChange={(e) => setCode(sanitize(e.target.value))}
          className={style.input}
          autoComplete="off"
        />
        {error && <span className={style.error}>{error}</span>}
        <button
          type="submit"
          className={style['connect-btn']}
          disabled={loading || code.length !== 6}>
          {loading ? 'Conectando…' : 'Conectar'}
        </button>
        <span className={style.counter}>{code.length}/6 caracteres</span>
      </form>
    </ReactModal>
  );
};
