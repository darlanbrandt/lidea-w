import React from 'react';
import css from './screentitle.module.css';

export default function ScreenTitle() {
  return (
    <div className={css.flex_container}>
      <div className={css.flex_screentitle}>
        <span className={css.text}>Título do aplicativo</span>
      </div>
    </div>
  );
}
