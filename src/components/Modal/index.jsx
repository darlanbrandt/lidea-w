import React, { useState } from 'react';
import api from '../../services/api';

export default function Modal() {
  const [key, setKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/rendezvous/', { key: key });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Código de 6 dígitos</label>
        <input
          type="text"
          name="key"
          id="key"
          value={key}
          placeholder="Insira o código aqui"
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

/*export default function Main() {
  return (
    <div>
      <form className={css.form}>
        <div className={css.inputFields}>
          <label htmlFor="name" className={css.srOnly}>
            Insira o código de 6 dígitos
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Código de 6 dígitos"
            required
            onChange={(event) => this.handleNameInput(event.target.value)}
          />
          <label htmlFor="email" className={css.srOnly}>
            Enter your e-mail
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Your email"
            required
            onChange={(e) => this.handleEmailInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${css.button} ${isDisabled ? css.disabled : null}`}
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
          }}>
          Send
        </button>
      </form>
    </div>
  );
}*/
