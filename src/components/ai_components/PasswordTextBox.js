import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function PasswordPasswordTextBox({
  componentName,
  componentProperties,
}) {
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minHeight: properties.height,
      minWidth: properties.width,
      position: 'relative',
    },
    password: {
      textAlign: properties.textAlignment,
      height: properties.height,
      fontSize: properties.fontSize,
      fontStyle: properties.fontStyle,
      fontWeight: properties.fontWeight,
      backgroundColor: properties.bgColor,
      color: properties.textColor,
      border: 'none',
      fontFamily: properties.fontTypeface,
      width: '100%',
      padding: '2px',
    },
  }));

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <input
        type="password"
        id={componentName}
        placeholder={properties.hint}
        className={classes.password}></input>
    </div>
  );
}
