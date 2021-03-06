/****************************************************************************
 * Componente para representar o componente Slider do App Inventor.         *
 *                                                                          *                                                                 *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * Inclui funções exclusivas do componente, referentes a estilização/cores  *
 * definidas pelo usuário, no App Inventor, bem como valor inicial, máximo  *
 * e mínimo do componente                                                   *
 ****************************************************************************/

import React, { useState, useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider as SliderComponent } from '@material-ui/core';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function Slider({ componentName, componentProperties }) {
  const { blocks } = useContext(ContentContext);
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minHeight: properties.height,
      minWidth: properties.width,
      position: 'relative',
      textAlign: 'center',
    },
    slider: {
      display: 'none',
    },
  }));

  // Retorna as cores do componente
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

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Retorna a posição inicial do componente
  let initialPosition = '';
  const componentInitialPosition = componentProperties.find(
    (prop) => prop.propertyName === 'ThumbPosition'
  );

  if (componentInitialPosition !== undefined) {
    initialPosition = Number(componentInitialPosition.propertyValue);
  }

  const [position, setPosition] = useState(initialPosition);

  // Retorna os valores do componente
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

  // Ações do componente
  let sliderPosition = '';
  const setSliderPosition = (event, val) => {
    sliderPosition = val;
  };

  const handleChange = () => {
    setPosition(sliderPosition);
  };

  function convertToNumber(sliderPosition) {
    return Number(sliderPosition);
  }

  return (
    <div className={componentClass}>
      <CustomSlider
        defaultValue={position}
        onChange={setSliderPosition}
        onChangeCommitted={handleChange}
        min={minValue}
        max={maxValue}
        style={{ width: '95%' }}
      />
      <span
        id={componentName}
        value={sliderPosition}
        className={classes.slider}>
        {convertToNumber(position)}
      </span>
    </div>
  );
}
