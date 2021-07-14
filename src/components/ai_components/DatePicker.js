import React from 'react';

export default function DatePicker({ componentName, componentProperties }) {
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
      <input type="date" id={componentName}></input>
    </div>
  );
}
