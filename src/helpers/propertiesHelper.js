/* Returns correct value for measurements */
const measureValue = (value) => {
  let measure = '';
  if (value === '-2') {
    measure = '100%';
  } else if (value > 0) {
    measure = value + 'px';
  } else {
    measure = Math.abs(parseInt(value)) - 1000 + '%';
  }
  return measure;
};

/* Returns correct positioning for horizontal alignment */
const alignHorizontalValue = (value) => {
  let alignHorizontal = '';
  switch (parseInt(value)) {
    case 1:
      alignHorizontal = 'flex-start';
      break;
    case 2:
      alignHorizontal = 'flex-end';
      break;
    case 3:
      alignHorizontal = 'center';
      break;
    default:
      break;
  }
  return alignHorizontal;
};

/* Returns correct positioning for vertical alignment */
const alignVerticalValue = (value) => {
  let alignVertical = '';
  switch (parseInt(value)) {
    case 1:
      alignVertical = 'flex-start';
      break;
    case 2:
      alignVertical = 'center';
      break;
    case 3:
      alignVertical = 'flex-end';
      break;
    default:
      break;
  }
  return alignVertical;
};

/* Returns text alignment */
const textAlignmentValue = (value) => {
  let textAlignment = '';
  switch (parseInt(value)) {
    case 0:
      textAlignment = 'left';
      break;
    case 1:
      textAlignment = 'center';
      break;
    case 2:
      textAlignment = 'right';
      break;
    default:
      break;
  }
  return textAlignment;
};

/* Returns correct font size value */
const fontSizeValue = (value) => {
  let fontSize = value + 'px';

  return fontSize;
};

/* Returns shape of button component */
const shapeValue = (value) => {
  let shape = '';
  switch (parseInt(value)) {
    case 1:
      shape = '10px';
      break;
    case 2:
      shape = '0';
      break;
    case 3:
      shape = '50%';
      break;
    default:
      break;
  }
  return shape;
};

export {
  measureValue,
  alignHorizontalValue,
  alignVerticalValue,
  textAlignmentValue,
  fontSizeValue,
  shapeValue,
};
