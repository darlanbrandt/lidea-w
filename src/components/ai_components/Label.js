import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function Label({ componentName, componentProperties }) {
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minWidth: properties.width,
      position: 'relative',
      backgroundColor: properties.bgColor,
      textAlign: properties.textAlignment,
      minHeight: properties.height,
    },
    span: {
      textAlign: properties.textAlignment,
      width: '100%',
      fontStyle: properties.fontStyle,
      fontWeight: properties.fontWeight,
      color: properties.textColor,
      height: '100%',
      fontSize: properties.fontSize,
      whiteSpace: 'nowrap',
      fontFamily: properties.fontTypeface,
    },
    invisible: {
      display: 'none',
    },
  }));

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <span className={classes.span} id={componentName}>
        {properties.text}
      </span>
    </div>
  );
}
