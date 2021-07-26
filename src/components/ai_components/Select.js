import React from 'react';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function Select({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default text from properties */
  const defaultValue = defaultTextValue(componentProperties);

  /* Select values for options*/
  let options = [];
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'ElementsFromString'
  );

  if (componentContent !== undefined) {
    options = componentContent.propertyValue.split(/,/u);
  }

  /* Add default value to options */
  const optionsList = [
    <option defaultValue={defaultValue} disabled hidden>
      {defaultValue}
    </option>,
  ];

  /* Get options from properties */
  for (let i = 0; i < options.length; i++) {
    optionsList.push(
      <option key={i + 1} value={options[i]}>
        {options[i]}
      </option>
    );
  }

  /* Get background color of Select component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Select component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Select component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Select component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Select component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  const handleSelectChange = (event) => {
    alert(event.target.value);
    document.querySelector('#L1').innerHTML = event.target.value;
  };

  return (
    <div
      style={{
        minHeight: `${height}`,
        minWidth: `${width}`,
        position: 'relative',
      }}>
      <select
        key={componentName}
        onChange={handleSelectChange}
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
