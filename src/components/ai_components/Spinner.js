import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './helpers/commonPropertiesHelper';
import { shapeValue } from '../../helpers/propertiesHelper';

import Select from '@material-ui/core/Select';

export default function Spinner({ componentName, componentProperties }) {
  const [selectedValue, setSelectedValue] = useState('');

  const useStyles = makeStyles(() => ({
    div: {
      padding: '1px',
    },
    select: {
      backgroundColor: `${bgColor}`,
      textAlign: `${textAlignment}`,
      fontSize: `${fontSize}`,
      width: '100%',
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

  /* Get background color of Select component */
  const bgColor = defaultBgColorValue(componentProperties);

  /* Get font size of Select component */
  const fontSize = defaultFontSizeValue(componentProperties);

  /* Get height of Select component */
  const height = defaultHeightValue(componentProperties);

  /* Get width of Select component */
  const width = defaultWidthValue(componentProperties);

  /* Get text alignment of Select component */
  const textAlignment = defaultTextAlignmentValue(componentProperties);

  /* Get border radius of Button component */
  let shape = '';
  const componentShape = componentProperties.find(
    (prop) => prop.propertyName === 'Shape'
  );

  if (componentShape !== undefined) {
    shape = shapeValue(componentShape.propertyValue);
  }

  const handleChange = (event) => {
    alert(event.target.value);
    setSelectedValue(event.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Select
        native
        key={componentName}
        value={selectedValue}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={classes.select}
        id={componentName}>
        {optionsList}
      </Select>
    </div>
  );
}
