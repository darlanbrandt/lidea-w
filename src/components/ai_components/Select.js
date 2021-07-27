import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
} from './commonProperties';
import { shapeValue } from '../../helpers/propertiesHelper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import { Select as SelectComponent } from '@material-ui/core';

export default function SelectUI({ componentName, componentProperties }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const useStyles = makeStyles((theme) => ({
    div: {
      padding: '1px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: `${bgColor}`,
      fontSize: `${fontSize}`,
      width: '100%',
      borderRadius: `${shape}`,
      border: 0,
      whiteSpace: 'nowrap',
      minHeight: '30px',
      height: `${height}`,
      textTransform: 'none',
    },
    select: {
      backgroundColor: `${bgColor}`,
      textAlign: `${textAlignment}`,
      fontSize: `${fontSize}`,
      width: '100%',
    },
  }));

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
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Button
        onClick={handleClickOpen}
        id={componentName}
        variant="contained"
        className={classes.button}>
        {defaultValue}
      </Button>
      <Dialog open={open} onClose={handleClose} disableScrollLock>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <SelectComponent
                native
                key={componentName}
                value={selectedValue}
                onChange={handleChange}
                className={classes.select}
                id={componentName}>
                {optionsList}
              </SelectComponent>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
