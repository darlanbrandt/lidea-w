import React from 'react';
import css from './header.module.css';
import logo from '../../assets/images/LideaLogo.png';

export default function Header() {
  return (
    <div className={css.header}>
      <img src={logo} alt="LIDEA-w logo" className={css.image} height="55" />

      <span className={css.appTitle}>Web Live Debugging for App Inventor</span>
    </div>
  );
}
