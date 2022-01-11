import React from 'react';
import ElementsContainer from '../ElementsContainer';
import style from './main.module.css';

export default function Main() {
  return (
    <main>
      <div className={style['phone-area']}>
        <div className={style.device}>
          <div className={style['device-screen']}>
            <ElementsContainer />
          </div>
        </div>
      </div>
    </main>
  );
}
