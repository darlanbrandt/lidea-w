import React from 'react';
import ElementsContainer from '../ElementsContainer';
import style from './main.module.css';
import ScreenTitle from '../ai_components/ScreenTitle';

export default function Main() {
  return (
    <main>
      <div className={style['phone-area']}>
        <div className={style.device}>
          <div className={style['device-screen']}>
            <ScreenTitle />
            <ElementsContainer />
          </div>
        </div>
      </div>
    </main>
  );
}
