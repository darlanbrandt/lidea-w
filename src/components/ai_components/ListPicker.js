/****************************************************************************
 * Componente para representar o componente ListPicker do App Inventor.     *
 *                                                                          *
 * Segue o padrão do App Inventor, usando um botão para exibir o seletor    *
 * de opções.                                                               *
 *                                                                          *
 * Utiliza MaterialUI para estilização.                                     *
 *                                                                          *
 * As ações realizadas pelo botão usam a função handleListPicker que chama  *
 * uma função genérica para todos os componentes.                           *
 ****************************************************************************/

import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { handleAction } from './helpers/componentActionHelper';

export default function ListPicker({
  componentName,
  componentProperties,
  blocks,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
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

  // Retorna as opções do componente
  let options = [];
  const componentContent = componentProperties.find(
    (prop) => prop.propertyName === 'ElementsFromString'
  );

  if (componentContent !== undefined) {
    options = componentContent.propertyValue.split(/,/u);
  }

  // Composição do componente
  const optionsList = [];
  options.forEach((option, index) => {
    optionsList.push(
      <option key={index + 1} value={option}>
        {option}
      </option>
    );
  });

  // Blocos
  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  // Ações realizadas pelo componente
  const handleListPicker = (action) => {
    handleAction(action, commands, componentName, variables);
  };

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
