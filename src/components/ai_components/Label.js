import React from 'react';

export default function Label({ componentName, componentProperties }) {
  /* Get default value from properties */
  let defaultValue = '';
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (!componentContent === undefined) {
    defaultValue = componentContent.propertyValue;
  }

  return (
    <div>
      <span id={componentName}>{defaultValue}</span>
    </div>
  );
}
