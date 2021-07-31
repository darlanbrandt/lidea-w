import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';
import { handleAction } from './helpers/componentActionHelper';

export default function TextBox({
  componentName,
  componentProperties,
  blocks,
}) {
  const properties = getDefaultProperties(componentProperties);

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      minHeight: properties.height,
      minWidth: properties.width,
      position: 'relative',
    },
    text: {
      textAlign: properties.textAlignment,
      height: properties.height,
      fontSize: properties.fontSize,
      width: '100%',
      fontStyle: properties.fontStyle,
      fontWeight: properties.fontWeight,
      color: properties.textColor,
      backgroundColor: properties.bgColor,
      fontFamily: properties.fontTypeface,
      padding: '2px',
    },
  }));

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  // Retorna tipo do campo de texto
  const componentInputType = componentProperties.find(
    (prop) => prop.propertyName === 'MultiLine'
  );

  let multiline = false;
  if (componentInputType === '#t') {
    multiline = true;
  }

  // Blocos
  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  // Ações realizadas no componente
  function handleTextBox(action) {
    handleAction(action, commands, componentName, variables);
  }

  if (multiline) {
    return (
      <div className={componentClass}>
        <textarea
          id={componentName}
          onMouseEnter={() => handleTextBox('GotFocus')}
          onMouseLeave={() => handleTextBox('LostFocus')}
          onMouseDown={() => handleTextBox('TouchDown')}
          onMouseUp={() => handleTextBox('TouchUp')}
          placeholder={properties.hint}
          defaultValue={properties.text}
          className={classes.text}></textarea>
      </div>
    );
  } else {
    return (
      <div className={componentClass}>
        <input
          type="text"
          id={componentName}
          onMouseEnter={() => handleTextBox('GotFocus')}
          onMouseLeave={() => handleTextBox('LostFocus')}
          placeholder={properties.hint}
          defaultValue={properties.text}
          className={classes.text}></input>
      </div>
    );
  }
}
