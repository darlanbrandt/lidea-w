/****************************************************************************
 * Componente para representar o componente CheckBox do App Inventor.       *
 *                                                                          *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * As ações realizadas pelo componente usam a função handleCheckbox que     *
 * chama uma função genérica comum a todos os componentes.                  *
 ****************************************************************************/

import React, { useState, useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function CheckBox({ componentName, componentProperties }) {
  const { blocks } = useContext(ContentContext);
  const [checked, setChecked] = useState(false);
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

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Blocos
  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  // Ações realizadas pelo componente
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={componentClass}>
      <Checkbox
        checked={properties.checked}
        color="primary"
        onChange={handleChange}
        value={checked}
        name={componentName}
        id={componentName}
      />
      <span className={classes.span}>{properties.text}</span>
    </div>
  );
}
