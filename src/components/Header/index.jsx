import React from 'react';
import style from './header.module.css';
import logo from '../../assets/images/LideaLogo.png';

export default function Header() {
  return (
    <header className={style.header}>
      <img src={logo} alt='LIDEA-w logo' />
      <p className={style['app-title']}>Web Live Debugging for App Inventor</p>
    </header>
  );
}
