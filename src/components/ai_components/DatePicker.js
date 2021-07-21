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

  const handleDateSelection = (event) => {
    alert(event.target.value);
  };

  return (
    <div>
      <input
        type="date"
        onChange={handleDateSelection}
        id={componentName}></input>
    </div>
  );
}
