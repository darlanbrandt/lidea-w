import React from 'react';

export default function VerticalArrangement({
  componentName,
  componentProperties,
  children,
}) {
  let defaultValue = '';
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentContent !== undefined) {
    defaultValue = componentContent.propertyValue.replace('#xFF', '#');
  }
  return (
    <div style={{ backgroundColor: `${defaultValue}` }} id={componentName}>
      {children}
    </div>
  );
}
