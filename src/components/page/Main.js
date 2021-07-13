import React from 'react';
import css from './main.module.css';

export default function Main() {
  return (
    <div className={css.main}>
      <div className={css.device}>
        <div className={css.phoneArea}>Components go here</div>
      </div>
    </div>
  );
}
//<img src={device} alt="device" />
