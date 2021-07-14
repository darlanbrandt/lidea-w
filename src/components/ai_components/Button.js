import React from 'react';

export default function Button({ componentName, componentProperties }) {
  /* Get default value from properties */
  let defaultValue = '';
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (componentContent !== undefined) {
    defaultValue = componentContent.propertyValue;
  }

  return (
    <div>
      <button id={componentName}>{defaultValue}</button>
    </div>
  );
}
