import React from 'react';
import {
  measureValue,
  fontSizeValue,
  textAlignmentValue,
  shapeValue,
} from '../../helpers/propertiesHelper';

export default function Button({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default value from properties */
  let textValue = '';
  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  }

  /* Get background color of Button component */
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  /* Get font size of Button component */
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }
  console.log(fontSize);

  /* Get height of Button component */
  let height = fontSize;
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  /* Get width of Button component */
  let width = '25%';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  console.log(componentWidth);

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  /* Get text alignment of Button component */
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }

  /* Get border radius of Button component */
  let shape = '';
  const componentShape = componentProperties.find(
    (prop) => prop.propertyName === 'Shape'
  );

  if (componentShape !== undefined) {
    shape = shapeValue(componentShape.propertyValue);
  }

  return (
    <div
      style={{
        display: 'flex',
        height: `${height}`,
        minWidth: `${width}`,
        maxWidth: `${width}`,
        position: 'relative',
      }}>
      <button
        id={componentName}
        style={{
          backgroundColor: `${bgColor}`,
          textAlign: `${textAlignment}`,
          fontSize: `${fontSize}`,
          width: '100%',
          borderRadius: `${shape}`,
          height: '100%',
          border: 0,
          padding: '2px',
        }}>
        {textValue}
      </button>
    </div>
  );
}
