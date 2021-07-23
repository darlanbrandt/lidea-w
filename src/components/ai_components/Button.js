import React, { useContext } from 'react';
import { shapeValue } from '../../helpers/propertiesHelper';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultAlignHorizontalValue,
} from './commonProperties';
import { commandToExecute } from '../../helpers/commandsToExecuteHelper';

export default function Button({ componentName, componentProperties, blocks }) {
  /*******************************
   *  Coomponents properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of Button component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Button component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Button component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Button component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Button component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get border radius of Button component */
  let shape = '';
  const componentShape = componentProperties.find(
    (prop) => prop.propertyName === 'Shape'
  );

  if (componentShape !== undefined) {
    shape = shapeValue(componentShape.propertyValue);
  }

  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const handleButtonClick = () => {
    commands.forEach((command) => {
      command.forEach((c) => {
        if (c.commandType === 'Click') {
          if (c.componentAction === componentName) {
            commandToExecute(c.commandsToExecute);
            /*c.commandsToExecute.forEach((commandToExecute) => {
              commandToExecute(commandToExecute);
            });*/
          }
        }
      });
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        height: `${height}`,
        minWidth: `${width}`,
        maxWidth: `${width}`,
        position: 'relative',
      }}>
      <button
        onClick={handleButtonClick}
        id={componentName}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: `${bgColor}`,
          fontSize: `${fontSize}`,
          width: '100%',
          borderRadius: `${shape}`,
          height: '100%',
          border: 0,
          padding: '2px',
          whiteSpace: 'nowrap',
          position: 'relative',
        }}>
        <span style={{ textAlign: `${textAlignment}`, width: '100%' }}>
          {textValue}
        </span>
      </button>
    </div>
  );
}
