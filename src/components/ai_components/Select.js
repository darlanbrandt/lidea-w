import React from 'react';
import {
  measureValue,
  fontSizeValue,
  textAlignmentValue,
} from '../../helpers/propertiesHelper';

export default function Select({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default value from properties */
  let defaultValue = '';
  let options = [];

  /* select default values for select element*/
  const componentDefault = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (componentDefault !== undefined) {
    defaultValue = componentDefault.propertyValue;
  }

  /* Add default value to options */
  const optionsList = [
    <option defaultValue={defaultValue} disabled hidden>
      {defaultValue}
    </option>,
  ];

  /* Select default values for options*/
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'ElementsFromString'
  );

  if (componentContent !== undefined) {
    options = componentContent.propertyValue.split(/,/u);
  }

  /* Get options from properties */
  for (let i = 0; i < options.length; i++) {
    optionsList.push(
      <option key={i} value={options[i]}>
        {options[i]}
      </option>
    );
  }

  /* Get background color of Select component */
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  /* Get font size of Select component */
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }

  /* Get height of Select component */
  let height = fontSize;
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  /* Get width of Select component */
  let width = '';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }
  console.log(width);

  /* Get text alignment of Select component */
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
        minHeight: `${height}`,
        minWidth: `${width}`,
        position: 'relative',
      }}>
      <select
        key={componentName}
        id={componentName}
        defaultValue={defaultValue}
        style={{
          backgroundColor: `${bgColor}`,
          textAlign: `${textAlignment}`,
          fontSize: `${fontSize}`,
          width: '100%',
        }}>
        {optionsList}
      </select>
    </div>
  );
}
