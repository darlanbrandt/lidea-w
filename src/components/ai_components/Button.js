import React from 'react';
import { shapeValue } from '../../helpers/propertiesHelper';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function Button({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of Button component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Button component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Button component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Button component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Button component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

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
