import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function PasswordTextBox({ componentName, componentProperties }) {
  /*******************************
   *  Coomponents properties     *
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

  return (
    <div>
      <input
        type="password"
        id={componentName}
        defaultValue={textValue}
        className={classes.text}></input>
    </div>
  );
}
