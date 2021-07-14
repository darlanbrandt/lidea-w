import React from 'react';

export default function Select({ componentName, componentProperties }) {
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

  return (
    <div>
      <select
        key={componentName}
        id={componentName}
        defaultValue={defaultValue}>
        {optionsList}
      </select>
    </div>
  );
}
