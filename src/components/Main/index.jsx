import React, { useState, useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import ElementsContainer from '../ElementsContainer';
import style from './main.module.css';
import ScreenTitle from '../ai_components/ScreenTitle';

export default function Main() {
  const { components } = useContext(ContentContext);
  console.log(components);
  return (
    <main>
      <div className={style['phone-area']}>
        {components.length > 0 ? (
          <div className={style.device}>
            <div className={style['device-screen']}>
              <ScreenTitle />
              <ElementsContainer />
            </div>
          </div>
        ) : (
          <div className={style.welcome}>
            <p className={style['welcome-title']}>Bem vindo ao LIDEA-w</p>
            <p>
              <span>
                Para iniciar o uso, clique no botão "Iniciar Sessão" no topo da
                página.
              </span>
              <span>
                Em seguida, preencha o código de 6 caracteres exibido no App
                Inventor e então clique em "Conectar".
              </span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
