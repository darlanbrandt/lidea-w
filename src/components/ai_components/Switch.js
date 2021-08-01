/****************************************************************************
 * Componente para representar o componente Switch do App Inventor.         *
 *                                                                          *                                                                 *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * Inclui funções exclusivas do componente, referentes a estilização/cores  *
 * definidas pelo usuário, no App Inventor, bem como estado inicial.        *
 ****************************************************************************/

import React, { useState } from 'react';
import { Switch as SwitchComponent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function Switch({ componentName, componentProperties }) {
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minHeight: properties.height,
      minWidth: properties.width,
      position: 'relative',
      textAlign: properties.textAlignment,
    },
    span: {
      textAlign: properties.textAlignment,
      width: '100%',
      fontSize: properties.fontSize,
      fontStyle: properties.fontStyle,
      fontWeight: properties.fontWeight,
      color: properties.textColor,
      fontFamily: properties.fontTypeface,
    },
  }));

  // Retorna as cores do componente
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

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Retorna o estado inicial do componente
  let isOn = '';
  const componentIsOn = componentProperties.find(
    (prop) => prop.propertyName === 'On'
  );

  if (componentIsOn !== undefined) {
    if (componentIsOn.propertyValue === '#t') {
      isOn = true;
    }
  }

  const [state, setState] = useState(isOn);

  // Ações do componente
  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <div className={componentClass}>
      <span className={classes.span}>{properties.text}</span>
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
