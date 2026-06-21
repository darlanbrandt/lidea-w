import React, { useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import css from './screentitle.module.css';

export default function ScreenTitle() {
  const { screenName } = useContext(ContentContext);

  return (
    <div className={css.flex_container}>
      <div className={css.flex_screentitle}>
        <span className={css.text}>{screenName || 'LIDEA-w'}</span>
      </div>
    </div>
  );
}
