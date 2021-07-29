import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider as SliderComponent } from '@material-ui/core';
import {
  defaultHeightValue,
  defaultWidthValue,
  getVisibility,
} from './helpers/commonPropertiesHelper';

export default function Slider({
  componentName,
  componentProperties,
}) {
  /*******************************
   *  Components properties     *
   *******************************/

  /* Get height of TextBox component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of TextBox component */
  const width = defaultWidthValue(componentProperties);

  /* Get values of component */
  let minValue = '';
  const componentMinValue = componentProperties.find(
    (prop) => prop.propertyName === 'MinValue'
  );

  if (componentMinValue !== undefined) {
    minValue = Number(componentMinValue.propertyValue);
  }

  let maxValue = '';
  const componentMaxValue = componentProperties.find(
    (prop) => prop.propertyName === 'MaxValue'
  );

  if (componentMaxValue !== undefined) {
    maxValue = Number(componentMaxValue.propertyValue);
  }

  /* Get initial value of component */
  let initialValue = '';
  const componentInitialValue = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbPosition'
  );

  if (componentInitialValue !== undefined) {
    initialValue = Number(componentInitialValue.propertyValue);
  }

  /* Get colors of component */
  let colorLeft = '#ffc800';
  const componentColorLeft = componentProperties.find(
    (prop) => prop.propertyName === 'ColorLeft'
  );

  if (componentColorLeft !== undefined) {
    colorLeft = componentColorLeft.propertyValue.replace('#xFF', '#');
  } 

  let colorRight = '#888';
  const componentColorRight = componentProperties.find(
    (prop) => prop.propertyName === 'ColorRight'
  );

  if (componentColorRight !== undefined) {
    colorRight = componentColorRight.propertyValue.replace('#xFF', '#');
  } 

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const CustomSlider = withStyles({
    root: {
      color: colorLeft,
      opacity: 1,
      height: 3,
    },
    thumb: {
      height: '16px',
      width: '16px',
      marginTop: -7,
      marginLeft: -7,
      '&:focus, &:hover, &$active': {
        boxShadow: '0px 0px',
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      height: 3,
      opacity: 1,
      backgroundColor: colorRight,
    },
  })(SliderComponent);

  const [value, setValue] = useState(initialValue);

  const useStyles = makeStyles(() => ({
    div: {
      minHeight: height,
      minWidth: width,
      position: 'relative',
      textAlign: 'center',
    },
    slider: {
      display: 'none',
    },
  }));
  const classes = useStyles();

  let sliderValue = '';

  const setSliderValue = (event, val) => {
    sliderValue = val;
  };

  const handleChange = () => {
    setValue(sliderValue);
  };

  function convertToNumber(sliderValue) {
    return Number(sliderValue);
  }

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <CustomSlider
        defaultValue={value}
        onChange={setSliderValue}
        onChangeCommitted={handleChange}
        min={minValue}
        max={maxValue}
        style={{ width: '95%' }}
      />
      <span id={componentName} value={sliderValue} className={classes.slider}>
        {convertToNumber(value)}
      </span>
    </div>
  );
}