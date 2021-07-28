import React, { Fragment, useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';

export default function TimePicker({ componentName, componentProperties }) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const useStyles = makeStyles(() => ({
    div: {
      padding: '1px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingRight: '0',
    },
    formControl: {
      minWidth: 120,
      paddingRight: '0',
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

  /*******************************
   *  Components properties     *
   *******************************/

  /* Get default text from properties */
  const defaultValue = defaultTextValue(componentProperties);

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
    //alert(event.target.value);
    setSelectedTime(event.target.value);
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
              <input
                type="time"
                onChange={handleChange}
                value={selectedTime}
                id={componentName}></input>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
