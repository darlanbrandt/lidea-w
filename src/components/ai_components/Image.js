import React from 'react';
import image from '../../assets/images/picture.png';

export default function Image() {
  return (
    <div>
      <img src={image} alt="Imagem" style={{ maxWidth: '50%' }} />
    </div>
  );
}
