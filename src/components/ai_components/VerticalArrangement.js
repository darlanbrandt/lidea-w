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
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get background color of VerticalArrangement */
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }

  /* Get height of VerticalArrangement */
  let height = '';
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }

  /* Get width of VerticalArrangement */
  let width = '';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  /* Get horizontal alignment of VerticalArrangement */
  let alignHorizontal = '';
  const componentAlignHorizontal = componentProperties.find(
    (prop) => prop.propertyName === 'AlignHorizontal'
  );

  if (componentAlignHorizontal !== undefined) {
    alignHorizontal = alignHorizontalValue(
      componentAlignHorizontal.propertyValue
    );
  }

  /* Get vertical alignment of VerticalArrangement */
  let alignVertical = '';
  const componentAlignVertical = componentProperties.find(
    (prop) => prop.propertyName === 'AlignVertical'
  );

  if (componentAlignVertical !== undefined) {
    alignVertical = alignVerticalValue(componentAlignVertical.propertyValue);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: `${alignHorizontal}`,
        justifyContent: `${alignVertical}`,
        backgroundColor: `${bgColor}`,
        minHeight: `${height}`,
        minWidth: `${width}`,
      }}
      id={componentName}>
      {children}
    </div>
  );
}
