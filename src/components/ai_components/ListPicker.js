import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  defaultTextValue,
  defaultBgColorValue,
  defaultFontSizeValue,
  defaultHeightValue,
  defaultWidthValue,
  defaultTextAlignmentValue,
  defaultFontStyleValue,
  defaultFontWeightValue,
  defaultTextColorValue,
  defaultFontTypefaceValue,
  getVisibility,
} from './helpers/commonPropertiesHelper';
import { shapeValue } from '../../helpers/propertiesHelper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { commandToExecute } from '../../helpers/commandsToExecuteHelper';

export default function ListPicker({
  componentName,
  componentProperties,
  blocks,
}) {
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
    span: {
      textAlign: textAlignment,
      width: '100%',
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      color: textColor,
      fontFamily: fontTypeface,
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

  /* Get font style of Button component */
  const fontStyle = defaultFontStyleValue(componentProperties);

  /* Get font weight of Button component */
  const fontWeight = defaultFontWeightValue(componentProperties);

  /* Get text color of Button component */
  const textColor = defaultTextColorValue(componentProperties);

  /* Get font typeface of Button component */
  const fontTypeface = defaultFontTypefaceValue(componentProperties);

  /* Get visibility of component */
  const visible = getVisibility(componentProperties);

  /* Get border radius of Button component */
  let shape = '';
  const componentShape = componentProperties.find(
    (prop) => prop.propertyName === 'Shape'
  );

  if (componentShape !== undefined) {
    shape = shapeValue(componentShape.propertyValue);
  }

  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  function handleListPicker(action) {
    commands.forEach((command) => {
      command.forEach((c) => {
        if (c.commandType === action) {
          if (c.componentAction === componentName) {
            commandToExecute(c.commandsToExecute, variables);
          }
        }
      });
    });
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CustomButton = withStyles(() => ({
    root: {
      backgroundColor: bgColor,
      '&:hover': {
        backgroundColor: bgColor,
      },
    },
  }))(Button);

  const classes = useStyles();

  let componentClass = visible ? `${classes.div}` : `${classes.invisible}`;

  return (
    <div className={componentClass}>
      <CustomButton
        onClick={handleClickOpen}
        id={componentName}
        variant="contained"
        className={classes.button}>
        <span className={classes.span}>{defaultValue}</span>
      </CustomButton>
      <Dialog open={open} onClose={handleClose} disableScrollLock>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Select
                native
                key={componentName}
                value={selectedValue}
                onChange={handleChange}
                onMouseEnter={(e) => handleListPicker('GotFocus')}
                onMouseLeave={(e) => handleListPicker('LostFocus')}
                className={classes.select}
                id={componentName}>
                {optionsList}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
