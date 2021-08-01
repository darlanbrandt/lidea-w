/****************************************************************************
 * Componente para representar o componente HorizontalArrangement do App    *
 * Inventor.                                                                *
 *                                                                          *
 * Serve como uma <div> para inclusão de demais componentes internamente    *
 *                                                                          *
 * Utiliza MaterialUI para estilização.                                     *
 ****************************************************************************/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function HorizontalArrangement({
  componentName,
  componentProperties,
  children,
}) {
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: properties.alignHorizontal,
      justifyContent: properties.alignVertical,
      backgroundColor: properties.bgColor,
      minHeight: properties.height,
      minWidth: properties.width,
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
    <div className={componentClass} id={componentName}>
      {children}
    </div>
  );
}
