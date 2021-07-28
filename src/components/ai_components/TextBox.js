import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './helpers/commonPropertiesHelper';
import { commandToExecute } from '../../helpers/commandsToExecuteHelper';

export default function TextBox({
  componentName,
  componentProperties,
  blocks,
}) {
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of TextBox component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of TextBox component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of TextBox component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of TextBox component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of TextBox component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  const componentInputType = componentProperties.find(
    (prop) => prop.propertyName === 'MultiLine'
  );

  const useStyles = makeStyles(() => ({
    div: {
      minHeight: `${height}`,
      minWidth: `${width}`,
      position: 'relative',
    },
    text: {
      textAlign: `${textAlignment}`,
      height: `${height}`,
      fontSize: `${fontSize}`,
      fontFamily: 'Roboto',
      width: '100%',
    },
  }));

  const classes = useStyles();

  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  function handleTextBox(action) {
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

  if (componentInputType === '#t') {
    return (
      <div className={classes.div}>
        <textarea
          id={componentName}
          onMouseEnter={() => handleTextBox('GotFocus')}
          onMouseLeave={() => handleTextBox('LostFocus')}
          onMouseDown={() => handleTextBox('TouchDown')}
          onMouseUp={() => handleTextBox('TouchUp')}
          placeholder={textValue}
          className={classes.text}></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          id={componentName}
          onMouseEnter={() => handleTextBox('GotFocus')}
          onMouseLeave={() => handleTextBox('LostFocus')}
          placeholder={textValue}
          className={classes.text}></input>
      </div>
    );
  }
}
