/****************************************************************************
 * Componente para representar o componente Spinner do App Inventor.        * 
 *                                                                          *                                                                 *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * Funciona como uma lista de seleção simples.                              *
 * Inclui funções para recuperação dos valores criados pelo usuário no App  *
 * Inventor                                                                 *
 ****************************************************************************/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function Spinner({ componentName, componentProperties }) {
  const [selectedValue, setSelectedValue] = useState('');
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minWidth: properties.width,
    },
  }));

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Retorna as opções do componente
  let prompt = [];
  const componentPrompt = componentProperties.find(
    (prop) => prop.propertyName === 'Prompt'
  );

  if (componentPrompt !== undefined) {
    prompt = componentPrompt.propertyValue;
  }

  let options = [];
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'ElementsFromString'
  );

  if (componentContent !== undefined) {
    options = componentContent.propertyValue.split(/,/u);
  }

  // Composição do componente
  const optionsList = [
    <option key="0" value={prompt} hidden>
      {prompt}
    </option>,
  ];

  options.forEach((option, index) => {
    optionsList.push(
      <option key={index + 1} value={option}>
        {option}
      </option>
    );
  });

  // Ações realizadas pelo componente
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={componentClass}>
      <Select
        native
        key={componentName}
        value={selectedValue}
        onChange={handleChange}
        id={componentName}>
        {optionsList}
      </Select>
    </div>
  );
}
