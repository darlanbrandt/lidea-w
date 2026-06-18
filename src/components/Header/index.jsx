import React, { useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import style from './header.module.css';

export default function Header({ onOpenModal }) {
  const { isConnected } = useContext(ContentContext);

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <span className={style['logo-dot']} />
        <span className={style['logo-text']}>
          LIDEA<span className={style['logo-w']}>-w</span>
        </span>
      </div>

      <p className={style['app-title']}>Web Live Debugging for App Inventor</p>

      <div className={style.actions}>
        {isConnected ? (
          <div className={style['status-pill']}>
            <span className={style['status-dot']} />
            <span className={style['status-text']}>Sessão ativa</span>
          </div>
        ) : (
          <button className={style['start-btn']} onClick={onOpenModal}>
            Iniciar Sessão
          </button>
        )}
      </div>
    </header>
  );
}
