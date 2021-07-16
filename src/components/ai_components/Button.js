import React from 'react';

export default function Button({ componentName, componentProperties }) {
  /* Get default value from properties */
  let textValue = '';
  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  }

  return (
    <div>
      <button id={componentName}>{textValue}</button>
    </div>
  );
}
