import React from 'react';

export default function VerticalArrangement({
  componentName,
  componentProperties,
  children,
}) {
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  let height = '';
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentHeight !== undefined) {
    height = componentHeight.propertyValue;
  }

  return (
    <div
      style={{ backgroundColor: `${bgColor}`, height: `${height}px` }}
      id={componentName}>
      {children}
    </div>
  );
}
