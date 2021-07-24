import React, { useContext } from 'react';
import css from './main.module.css';
import device from '../../assets/images/DeviceSmall.png';
import ScreenTitle from '../ai_components/ScreenTitle';
import ContentContext from '../../context/ContentContext';
import Elements from './Elements';

export default function Main() {
  const { components, blocks } = useContext(ContentContext);

  return (
    <div className={css.main}>
      <div className={css.device}>
        <div className={css.phoneArea}>
          <ScreenTitle />
          <Elements components={components} blocks={blocks} />
        </div>
        <img src={device} alt="device" className={css.deviceImage} />
      </div>
    </div>
  );
}
