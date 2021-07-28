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
      textAlign: `${textAlignment}`,
    },
    span: {
      textAlign: `${textAlignment}`,
      width: '100%',
      fontSize: `${fontSize}`,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.div}>
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
