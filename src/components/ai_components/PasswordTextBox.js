import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function PasswordPasswordTextBox({
  componentName,
  componentProperties,
}) {
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of PasswordTextBox component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of PasswordTextBox component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of PasswordTextBox component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of PasswordTextBox component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of PasswordTextBox component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get font style of PasswordTextBox component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of PasswordTextBox component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of PasswordTextBox component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of PasswordTextBox component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const useStyles = makeStyles(() => ({
    div: {
      minHeight: height,
      minWidth: width,
      position: 'relative',
    },
    password: {
      textAlign: textAlignment,
      height: height,
      fontSize: fontSize,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      backgroundColor: bgColor,
      color: textColor,
      border: 'none',
      fontFamily: fontTypeface,
      width: '100%',
    },
  }));

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <input
        type="password"
        id={componentName}
        defaultValue={textValue}
        className={classes.password}></input>
    </div>
  );
}
