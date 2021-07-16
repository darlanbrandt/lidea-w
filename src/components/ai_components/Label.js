import React from 'react';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function Label({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of Label component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Label component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Label component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Label component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Label component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

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
