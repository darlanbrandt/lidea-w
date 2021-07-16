import {
  measureValue,
  alignHorizontalValue,
  alignVerticalValue,
  fontSizeValue,
  textAlignmentValue,
} from '../../helpers/propertiesHelper';

/* Get default value from properties */
function defaultTextValue(componentProperties) {
  let textValue = <>&nbsp;</>;

  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  const componentHintValue = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  } else {
    textValue = componentHintValue.propertyValue;
  }
  return textValue;
}

/* Get background color component */
function defaultBgColorValue(componentProperties) {
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }
  return bgColor;
}

/* Get font size of component */
function defaultFontSizeValue(componentProperties) {
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }
  return fontSize;
}

/* Get height of component */
function defaultHeightValue(componentProperties) {
  let height = defaultFontSizeValue(componentProperties);
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }
  return height;
}

/* Get width of Button component */
function defaultWidthValue(componentProperties) {
  let width = '25%';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  return width;
}

/* Get text alignment of component */
function defaultTextAlignmentValue(componentProperties) {
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }
  return textAlignment;
}

/* Get horizontal alignment of VerticalArrangement */
function defaultAlignHorizontalValue(componentProperties) {
  let alignHorizontal = '';
  const componentAlignHorizontal = componentProperties.find(
    (prop) => prop.propertyName === 'AlignHorizontal'
  );

  if (componentAlignHorizontal !== undefined) {
    alignHorizontal = alignHorizontalValue(
      componentAlignHorizontal.propertyValue
    );
  }
  return alignHorizontal;
}

/* Get vertical alignment of VerticalArrangement */
function defaultAlignVerticalValue(componentProperties) {
  let alignVertical = '';
  const componentAlignVertical = componentProperties.find(
    (prop) => prop.propertyName === 'AlignVertical'
  );

  if (componentAlignVertical !== undefined) {
    alignVertical = alignVerticalValue(componentAlignVertical.propertyValue);
  }
  return alignVertical;
}

export {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultAlignHorizontalValue,
  defaultAlignVerticalValue,
};
