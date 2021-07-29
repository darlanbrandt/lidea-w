import React from 'react';
import { Button as ButtonComponent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { shapeValue } from '../../helpers/propertiesHelper';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultFontStyleValue,
  defaultFontWeightValue,
  defaultTextColorValue,
  defaultFontTypefaceValue,
  getVisibility,
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
      backgroundColor: bgColor,
      fontSize: fontSize,
      width: '100%',
      borderRadius: shape,
      border: 0,
      whiteSpace: 'nowrap',
      minHeight: '30px',
      height: height,
      textTransform: 'none',
    },
    span: {
      textAlign: textAlignment,
      width: '100%',
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      color: textColor,
      fontFamily: fontTypeface,
    },
    invisible: {
      display: 'none',
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

  /* Get font style of Button component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of Button component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of Button component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of Button component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

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

  const CustomButton = withStyles(() => ({
    root: {
      backgroundColor: bgColor,
      '&:hover': {
        backgroundColor: bgColor,
      },
    },
  }))(ButtonComponent);

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <CustomButton
        onClick={() => handleButton('Click')}
        onMouseEnter={() => handleButton('GotFocus')}
        onMouseLeave={() => handleButton('LostFocus')}
        id={componentName}
        variant="contained"
        className={classes.button}>
        <span className={classes.span}>{textValue}</span>
      </CustomButton>
    </div>
  );
}
