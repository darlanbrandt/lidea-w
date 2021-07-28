import React from 'react';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './helpers/commonPropertiesHelper';

export default function Label({ componentName, componentProperties }) {
  /*******************************
   *  Components properties     *
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
        minWidth: `${width}`,
        position: 'relative',
        backgroundColor: `${bgColor}`,
        textAlign: `${textAlignment}`,
        minHeight: `${height}`,
      }}>
      <span
        id={componentName}
        style={{
          width: '100%',
          height: '100%',
          fontSize: `${fontSize}`,
          whiteSpace: 'nowrap',
        }}>
        {textValue}
      </span>
    </div>
  );
}
