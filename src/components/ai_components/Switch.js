import React, { useState } from 'react';
import { Switch as SwitchComponent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';

export default function Switch({ componentName, componentProperties }) {
  const [state, setState] = useState(false);

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
      textAlign: `${textAlignment}`,
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <div className={classes.div}>
      <span>{textValue}</span>
      <SwitchComponent
        checked={state}
        onChange={handleChange}
        name={componentName}
        id={componentName}
        value={state}
      />
    </div>
  );
}
