import React from 'react';
import css from './main.module.css';
import device from '../../assets/images/DeviceSmall.png';

export default function Main() {
  return (
    <div className={css.main}>
      <div className={css.device}>
        <div className={css.phoneArea}>Components go here</div>
        <img src={device} alt="device" />
      </div>
    </div>
  );
}
