/****************************************************************************
 * Componente para representar o componente ListPicker do App Inventor.     *
 *                                                                          *
 * Segue o padrão do App Inventor, usando um botão para exibir o seletor    *
 * de data.                                                                 *
 *                                                                          *
 * Utiliza MaterialUI para estilização.                                     *
 ****************************************************************************/

import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';

export default function TimePicker({ componentName, componentProperties }) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
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
  }));

  const CustomButton = withStyles(() => ({
    root: {
      backgroundColor: properties.bgColor,
      '&:hover': {
        backgroundColor: properties.bgColor,
      },
    },
  }))(Button);

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Ações realizadas no componente
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

  return (
    <div className={componentClass}>
      <CustomButton
        onClick={handleClickOpen}
        id={componentName}
        variant="contained"
        className={classes.button}>
        <span className={classes.span}>{properties.text}</span>
      </CustomButton>
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
