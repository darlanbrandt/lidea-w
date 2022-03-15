import React, { useState } from 'react';
import ReactModal from 'react-modal';
import api from '../../services/api';
import style from './main.module.css';

export const Modal = ({ isOpen, onRequestClose }) => {
  const [key, setKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/rendezvous/', { key: key });
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      overlayClassName={style.modalOverlay}
      className={style.modal}>
      <span>
        Para visualizar a aplicação criada no App Inventor, digite a chave de 6
        caracteres no campo abaixo
      </span>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Enviar</button>
      </form>
    </ReactModal>
  );
};
/*onAfterOpen={() => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
      }}
      onAfterClose={() => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }}*/
