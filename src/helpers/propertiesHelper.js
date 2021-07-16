function measureValue(value) {
  let measure = '';
  if (value === '-2') {
    measure = '100%';
  } else if (value > 0) {
    measure = value + 'px';
  } else {
    measure = Math.abs(parseInt(value)) - 1000;
  }
  return measure;
}

function alignHorizontalValue(value) {
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
}

function alignVerticalValue(value) {
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
}

export { measureValue, alignHorizontalValue, alignVerticalValue };
