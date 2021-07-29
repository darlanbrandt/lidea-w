import { convertDecimaltoHexColor } from './commandsHelper';
/* Receives commands and variables to execute */
const commandToExecute = (commands, variables) => {
  commands.forEach((command) => {
    /* Checks if command sets properties of components */
    if (command.commandType === 'set-property') {
      let componentId = '#' + command.componentAction;
      let value = '';

      /* If command property value is an object iterate through object */
      if (typeof command.propertyValue === 'object') {
        /* if property is an object with component value */
        if ('component' in command.propertyValue) {
          let componentValueId = '#' + command.propertyValue.component;
          value = document.querySelector(componentValueId).innerHTML;

          /* or if it comes from a scope variable */
        } else if ('scopeVariable' in command.propertyValue) {
          console.log(command.propertyValue.scopeVariable);

          /* or from a global variable */
        } else if ('globalVariable' in command.propertyValue) {
          variables.forEach((variable) => {
            const variableToExecute = variable.find(
              (prop) =>
                prop.variableName === command.propertyValue.globalVariable
            );
            value = variableToExecute.variableValue;
          });
        }

        /* else, returns its value */
      } else {
        value = command.propertyValue;
      }

      /* start of switch case to type of property action must be set */
      switch (command.propertyAction) {
        case 'BackgroundColor':
          let backgroundColor = '#' + convertDecimaltoHexColor(value);
          document.querySelector(componentId).style.backgroundColor =
            backgroundColor;
          break;
        case 'Text':
          document.querySelector(componentId).innerHTML = value;
          document.querySelector(componentId).value = value;
      }
      /* or checks if command sets new value to global variable */
    } else if (command.commandType === 'set-global-var-value') {
      console.log('variavel global');
      /* or checks if command sets new value to scope variable */
    } else if (command.commandType === 'declare-scope-variable') {
      console.log('variável de escopo');
    } else {
      console.log('não identificado');
    }
  });
};

export { commandToExecute };
