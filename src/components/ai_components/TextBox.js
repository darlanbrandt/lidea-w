import React from 'react';
import {
  measureValue,
  fontSizeValue,
  textAlignmentValue,
} from '../../helpers/propertiesHelper';

export default function TextBox({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default value from properties */
  let textValue = '';
  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  }

  /* Get background color of TextBox component */
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  /* Get font size of TextBox component */
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }

  /* Get height of TextBox component */
  let height = fontSize;
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  /* Get width of TextBox component */
  let width = '';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  /* Get text alignment of TextBox component */
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }

  const componentInputType = componentProperties.find(
    (prop) => prop.propertyName === 'MultiLine'
  );

  if (componentInputType === '#t') {
    return (
      <div
        style={{
          minHeight: `${height}`,
          minWidth: `${width}`,
          position: 'relative',
        }}>
        <textarea
          id={componentName}
          defaultValue={textValue}
          style={{
            textAlign: `${textAlignment}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
            width: '100%',
          }}></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          id={componentName}
          defaultValue={textValue}
          style={{
            textAlign: `${textAlignment}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
            width: '100%',
          }}></input>
      </div>
    );
  }
}
