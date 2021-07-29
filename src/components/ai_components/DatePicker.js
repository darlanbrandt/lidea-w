import React, { Fragment, useState } from 'react';
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

export default function DatePicker({ componentName, componentProperties }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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
      backgroundColor: bgColor,
      fontSize: fontSize,
      width: '100%',
      borderRadius: shape,
      border: 0,
      whiteSpace: 'nowrap',
      minHeight: '30px',
      height: height,
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

  const handleChange = (event) => {
    alert(event.target.value);
    setSelectedDate(event.target.value);
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
              <input
                type="date"
                onChange={handleChange}
                value={selectedDate}
                id={componentName}></input>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
