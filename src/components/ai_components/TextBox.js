import React from 'react';

export default function TextBox({ componentName, componentProperties }) {
  /* Get default value from properties */
  let defaultValue = '';
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentContent !== undefined) {
    defaultValue = componentContent.propertyValue;
  }

  const componentInputType = componentProperties.find(
    (prop) => prop.propertyName === 'MultiLine'
  );

  if (componentInputType === '#t') {
    return (
      <div>
        <textarea id={componentName} defaultValue={defaultValue}></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          id={componentName}
          defaultValue={defaultValue}></input>
      </div>
    );
  }
}
