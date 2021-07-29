import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultWidthValue,
  getVisibility,
} from './helpers/commonPropertiesHelper';

import Select from '@material-ui/core/Select';

export default function Spinner({ componentName, componentProperties }) {
  const [selectedValue, setSelectedValue] = useState('');

  const useStyles = makeStyles(() => ({
    div: {
      minWidth: width,
    },
  }));

  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const defaultValue = defaultTextValue(componentProperties);

  /* Select values for options*/
  let options = [];
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'ElementsFromString'
  );

  if (componentContent !== undefined) {
    options = componentContent.propertyValue.split(/,/u);
  }

  /* Add default value to options */
  const optionsList = [
    <option defaultValue={defaultValue} disabled hidden>
      {defaultValue}
    </option>,
  ];

  /* Get options from properties */
  for (let i = 0; i < options.length; i++) {
    optionsList.push(
      <option key={i + 1} value={options[i]}>
        {options[i]}
      </option>
    );
  }

  /* Get width of Spinner component */
  const width = defaultWidthValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <Select
        native
        key={componentName}
        value={selectedValue}
        onChange={handleChange}
        defaultValue={defaultValue}
        id={componentName}>
        {optionsList}
      </Select>
    </div>
  );
}
