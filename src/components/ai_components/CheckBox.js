import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function CheckBox({
  componentName,
  componentProperties,
  blocks,
}) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of CheckBox component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of CheckBox component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of CheckBox component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of CheckBox component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of CheckBox component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get font style of CheckBox component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of CheckBox component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of CheckBox component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of CheckBox component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const useStyles = makeStyles(() => ({
    div: {
      minHeight: height,
      minWidth: width,
      position: 'relative',
      textAlign: textAlignment,
    },
    span: {
      textAlign: textAlignment,
      width: '100%',
      fontSize: fontSize,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      color: textColor,
      fontFamily: fontTypeface,
    },
  }));

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <Checkbox
        checked={checked}
        color="primary"
        onChange={handleChange}
        value={checked}
        name={componentName}
        id={componentName}
      />
      <span className={classes.span}>{textValue}</span>
    </div>
  );
}
