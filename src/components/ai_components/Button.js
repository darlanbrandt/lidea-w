import React from 'react';
import { Button as ButtonComponent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shapeValue } from '../../helpers/propertiesHelper';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultAlignHorizontalValue,
} from './helpers/commonPropertiesHelper';
import { commandToExecute } from '../../helpers/commandsToExecuteHelper';

export default function Button({ componentName, componentProperties, blocks }) {
  const useStyles = makeStyles(() => ({
    div: {
      padding: '1px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: `${bgColor}`,
      fontSize: `${fontSize}`,
      width: '100%',
      borderRadius: `${shape}`,
      border: 0,
      whiteSpace: 'nowrap',
      minHeight: '30px',
      height: `${height}`,
      textTransform: 'none',
    },
    span: {
      textAlign: `${textAlignment}`,
      width: '100%',
    },
  }));
  /*******************************
   *  Components properties     *
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

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  const handleButtonClick = () => {
    commands.forEach((command) => {
      command.forEach((c) => {
        if (c.commandType === 'Click') {
          if (c.componentAction === componentName) {
            commandToExecute(c.commandsToExecute, variables);
          }
        }
      });
    });
  };

  function handleButton(action) {
    commands.forEach((command) => {
      command.forEach((c) => {
        if (c.commandType === action) {
          if (c.componentAction === componentName) {
            commandToExecute(c.commandsToExecute, variables);
          }
        }
      });
    });
  }

  const classes = useStyles();

  return (
    <div className={classes.div}>
      <ButtonComponent
        onClick={() => handleButton('Click')}
        onMouseEnter={() => handleButton('GotFocus')}
        onMouseLeave={() => handleButton('LostFocus')}
        id={componentName}
        variant="contained"
        className={classes.button}>
        <span className={classes.span}>{textValue}</span>
      </ButtonComponent>
    </div>
  );
}
