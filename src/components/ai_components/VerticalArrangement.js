import React from 'react';
import {
  measureValue,
  alignHorizontalValue,
  alignVerticalValue,
} from '../../helpers/propertiesHelper';

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
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  let width = '';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  console.log(width);

  return (
    <div
      style={{ backgroundColor: `${bgColor}`, height: `${height}` }}
      id={componentName}>
      {children}
    </div>
  );
}
