import {
  measureValue,
  alignHorizontalValue,
  alignVerticalValue,
  fontSizeValue,
  textAlignmentValue,
  fontTypefaceValue,
} from '../../../helpers/propertiesHelper';

/* Get default value from properties */
const defaultTextValue = (componentProperties) => {
  let textValue = <>&nbsp;</>;

  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  const componentHintValue = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  } else if (componentHintValue !== undefined) {
    textValue = componentHintValue.propertyValue;
  } else {
    textValue = '';
  }
  return textValue;
};

/* Get background color component */
const defaultBgColorValue = (componentProperties) => {
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }
  return bgColor;
};

/* Get font size of component */
const defaultFontSizeValue = (componentProperties) => {
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }
  return fontSize;
};

/* Get font style */
const defaultFontStyleValue = (componentProperties) => {
  let fontStyle = 'none';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontItalic'
  );

  if (componentFontSize !== undefined) {
    if (componentFontSize.propertyValue === '#t') {
      fontStyle = 'italic';
    }
  }
  return fontStyle;
};

/* Get font weight */
const defaultFontWeightValue = (componentProperties) => {
  let fontWeight = 'normal';
  const componentFontWeight = componentProperties.find(
    (prop) => prop.propertyName === 'FontBold'
  );

  if (componentFontWeight !== undefined) {
    if (componentFontWeight.propertyValue === '#t') {
      fontWeight = 'bold';
    }
  }
  return fontWeight;
};

/* Get font typeface */
const defaultFontTypefaceValue = (componentProperties) => {
  let fontTypeface = 'Roboto';
  const componentFontTypeface = componentProperties.find(
    (prop) => prop.propertyName === 'FontTypeface'
  );

  if (componentFontTypeface !== undefined) {
    fontTypeface = fontTypefaceValue(componentFontTypeface.propertyValue);
  }
  return fontTypeface;
};

/* Get text color component */
const defaultTextColorValue = (componentProperties) => {
  let textColor = 'black';
  const componentTextColor = componentProperties.find(
    (prop) => prop.propertyName === 'TextColor'
  );

  if (componentTextColor !== undefined) {
    textColor = componentTextColor.propertyValue.replace('#xFF', '#');
  }
  return textColor;
};

/* Get height of component */
const defaultHeightValue = (componentProperties) => {
  let height = defaultFontSizeValue(componentProperties);
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }
  return height;
};

/* Get width of Button component */
const defaultWidthValue = (componentProperties) => {
  let width = '25%';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  return width;
};

/* Get text alignment of component */
const defaultTextAlignmentValue = (componentProperties) => {
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }
  return textAlignment;
};

/* Get horizontal alignment of VerticalArrangement */
const defaultAlignHorizontalValue = (componentProperties) => {
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
};

/* Get vertical alignment of VerticalArrangement */
const defaultAlignVerticalValue = (componentProperties) => {
  let alignVertical = '';
  const componentAlignVertical = componentProperties.find(
    (prop) => prop.propertyName === 'AlignVertical'
  );

  if (componentAlignVertical !== undefined) {
    alignVertical = alignVerticalValue(componentAlignVertical.propertyValue);
  }
  return alignVertical;
};

/* Get visibility of component */
const getVisibility = (componentProperties) => {
  let visible = true;
  const componentVisible = componentProperties.find(
    (prop) => prop.propertyName === 'Visible'
  );

  if (componentVisible !== undefined) {
    if (componentVisible.propertyValue === '#f') {
      visible = false;
    }
  }
  return visible;
};

export {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultAlignHorizontalValue,
  defaultAlignVerticalValue,
  defaultFontStyleValue,
  defaultFontWeightValue,
  defaultTextColorValue,
  defaultFontTypefaceValue,
  getVisibility,
};
