import React from 'react';
import css from './main.module.css';
import device from '../../assets/images/DeviceSmall.png';
import ScreenTitle from '../ai_components/ScreenTitle';
import Elements from './Elements';

export default function Main() {
  return (
    <div className={css.main}>
      <div className={css.device}>
        <div className={css.phoneArea}>
          <ScreenTitle />
          <Elements />
        </div>
        <img src={device} alt="device" className={css.deviceImage} />
      </div>
    </div>
  );
}
