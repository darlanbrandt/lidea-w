import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Slider as SliderComponent } from '@material-ui/core';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './helpers/commonPropertiesHelper';

export default function Slider({ componentName, componentProperties }) {
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

  const useStyles = makeStyles(() => ({
    div: {
      minHeight: `${height}`,
      minWidth: `${width}`,
      position: 'relative',
      textAlign: 'center',
    },
    slider: {
      display: 'none',
    },
  }));
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, val) => {
    setValue(val);
  };

  function convertToNumber(sliderValue) {
    return Number(sliderValue);
  }

  return (
    <div className={classes.div}>
      <Grid container spacing={2}>
        <Grid item xs>
          <SliderComponent
            style={{ width: '95%' }}
            key={componentName}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleChange}
            aria-labelledby="continuous-slider"
            min={-16777216}
            max={0}
          />
          <span id={componentName} value={value} className={classes.slider}>
            {convertToNumber(value)}
          </span>
        </Grid>
      </Grid>
    </div>
  );
}
