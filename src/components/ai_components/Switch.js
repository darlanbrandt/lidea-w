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
  defaultFontStyleValue,
  defaultFontWeightValue,
  defaultTextColorValue,
  defaultFontTypefaceValue,
  getVisibility,
} from './helpers/commonPropertiesHelper';

export default function Switch({ componentName, componentProperties }) {
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const textValue = defaultTextValue(componentProperties);

  /* Get background color of Switch component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Switch component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Switch component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Switch component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Switch component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get font style of Switch component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of Switch component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of Switch component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of Switch component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get initial state of element */
  let isOn = '';
  const componentIsOn = componentProperties.find(
    (prop) => prop.propertyName === 'On'
  );

  if (componentIsOn !== undefined) {
    if (componentIsOn.propertyValue === '#t') {
      isOn = true;
    }
  }

  /* Get colors of component */
  let thumbColorActive = 'white';
  const componentThumbColorActive = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbColorActive'
  );

  if (componentThumbColorActive !== undefined) {
    thumbColorActive = componentThumbColorActive.propertyValue.replace(
      '#xFF',
      '#'
    );
  }

  let thumbColorInactive = '#ccc';
  const componentThumbColorInactive = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbColorInactive'
  );

  if (componentThumbColorInactive !== undefined) {
    thumbColorInactive = componentThumbColorInactive.propertyValue.replace(
      '#xFF',
      '#'
    );
  }

  let trackColorActive = 'lime';
  const componentTrackColorActive = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbColorActive'
  );

  if (componentTrackColorActive !== undefined) {
    trackColorActive = componentTrackColorActive.propertyValue.replace(
      '#xFF',
      '#'
    );
  }

  let trackColorInactive = '#444';
  const componentTrackColorInactive = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbColorInactive'
  );

  if (componentTrackColorInactive !== undefined) {
    trackColorInactive = componentTrackColorInactive.propertyValue.replace(
      '#xFF',
      '#'
    );
  }

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const [state, setState] = useState(isOn);

  const CustomSwitch = withStyles({
    switchBase: {
      color: thumbColorInactive,
      '&$checked': {
        color: thumbColorActive,
        '& + $track': {
          opacity: 1,
          backgroundColor: trackColorActive,
        },
      },
    },
    checked: {},
    track: { backgroundColor: trackColorInactive, opacity: 1 },
  })(SwitchComponent);

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

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
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
