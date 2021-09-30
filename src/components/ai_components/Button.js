/****************************************************************************
 * Componente para representar o componente Button do App Inventor.         *
 *                                                                          *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * As ações realizadas pelo botão usam a função handleButton que chama uma  *
 * função genérica comum a todos os componentes.                            *
 ****************************************************************************/

import React, { useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import { Button as ButtonComponent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';
import { handleAction } from './helpers/componentActionHelper';

export default function Button({ componentName, componentProperties }) {
  const { blocks } = useContext(ContentContext);
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      padding: '1px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: properties.bgColor,
      fontSize: properties.fontSize,
      width: '100%',
      borderRadius: properties.shape,
      border: 0,
      whiteSpace: 'nowrap',
      minHeight: '30px',
      height: properties.height,
      textTransform: 'none',
    },
    span: {
      textAlign: properties.textAlignment,
      width: '100%',
      fontStyle: properties.fontStyle,
      fontWeight: properties.fontWeight,
      color: properties.textColor,
      fontFamily: properties.fontTypeface,
    },
    invisible: {
      display: 'none',
    },
  }));

  const CustomButton = withStyles(() => ({
    root: {
      backgroundColor: properties.bgColor,
      '&:hover': {
        backgroundColor: properties.bgColor,
      },
    },
  }))(ButtonComponent);

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Ações realizadas pelo componente
  const handleButton = (action) => {
    handleAction(action, componentName, blocks);
  };

  return (
    <div className={componentClass}>
      <CustomButton
        onClick={() => handleButton('Click')}
        onMouseEnter={() => handleButton('GotFocus')}
        onMouseLeave={() => handleButton('LostFocus')}
        id={componentName}
        variant="contained"
        className={classes.button}>
        <span className={classes.span}>{properties.text}</span>
      </CustomButton>
    </div>
  );
}
