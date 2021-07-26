import React from 'react';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function TextBox({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of TextBox component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of TextBox component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of TextBox component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of TextBox component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of TextBox component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

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
