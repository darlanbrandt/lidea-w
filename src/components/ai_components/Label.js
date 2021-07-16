import React from 'react';
import {
  measureValue,
  fontSizeValue,
  textAlignmentValue,
} from '../../helpers/propertiesHelper';

export default function Label({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default value from properties */
  let textValue = <>&nbsp;</>;
  const componentTextValue = componentProperties.find(

    (prop) => prop.propertyName === 'Text'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  }

  /* Get background color of Label component */
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  /* Get font size of Label component */
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }

  /* Get height of Label component */
  let height = fontSize;
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  /* Get width of Label component */
  let width = '';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  /* Get text alignment of Label component */
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }

  return (
    <div
      style={{
        backgroundColor: `${bgColor}`,
        minHeight: `${height}`,
        width: `${width}`,
        textAlign: `${textAlignment}`,
      }}>
      <span id={componentName} style={{ fontSize: `${fontSize}` }}>
        {textValue}
      </span>
    </div>
  );
}
