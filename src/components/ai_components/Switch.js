import React, { useState } from 'react';
import { Switch as SwitchComponent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './helpers/commonPropertiesHelper';

export default function Switch({ componentName, componentProperties }) {
  const [state, setState] = useState(false);

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

  const CustomSwitch = withStyles({
    switchBase: {
      color: 'yellow',
      '&$checked': {
        color: 'red',
        '& + $track': {
          opacity: 1,
          backgroundColor: 'turquoise',
        },
      },
    },
    checked: {},
    track: { backgroundColor: 'blue', opacity: 1 },
  })(SwitchComponent);

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

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <div className={classes.div}>
      <span className={classes.span}>{textValue}</span>
      <CustomSwitch
        checked={state}
        onChange={handleChange}
        name={componentName}
        id={componentName}
        value={state}
      />
    </div>
  );
}
