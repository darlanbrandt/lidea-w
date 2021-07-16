import React from 'react';

export default function TextBox({ componentName, componentProperties }) {
  /* Get default value from properties */
  let textValue = '';
  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  }

  let height = '';
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = componentHeight.propertyValue;
  }

  let fontSize = '';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = componentFontSize.propertyValue;
  }

  const componentInputType = componentProperties.find(
    (prop) => prop.propertyName === 'MultiLine'
  );

  if (componentInputType === '#t') {
    return (
      <div>
        <textarea
          id={componentName}
          defaultValue={textValue}
          style={{
            height: `${height}px`,
            fontSize: `${fontSize}px`,
          }}></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          id={componentName}
          defaultValue={textValue}
          style={{ height: `${height}px`, fontSize: `${fontSize}px` }}></input>
      </div>
    );
  }
}
