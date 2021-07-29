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

export default function Label({ componentName, componentProperties }) {
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of Label component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Label component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Label component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Label component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Label component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get font style of Label component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of Label component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of Label component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of Label component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const useStyles = makeStyles(() => ({
    div: {
      minWidth: width,
      position: 'relative',
      backgroundColor: bgColor,
      textAlign: textAlignment,
      minHeight: height,
    },
    span: {
      textAlign: textAlignment,
      width: '100%',
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      color: textColor,
      width: '100%',
      height: '100%',
      fontSize: fontSize,
      whiteSpace: 'nowrap',
      fontFamily: fontTypeface,
    },
    invisible: {
      display: 'none',
    },
  }));

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <span className={classes.span} id={componentName}>
        {textValue}
      </span>
    </div>
  );
}
