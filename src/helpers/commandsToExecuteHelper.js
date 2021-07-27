import { convertDecimaltoHexColor } from './commandsHelper';

const commandToExecute = (commands) => {
  commands.forEach((command) => {
    if (command.commandType === 'set-property') {
      let componentId = '#' + command.componentAction;
      let value = '';
      console.log(command.propertyValue);
      if (typeof command.propertyValue === 'object') {
        if ('component' in command.propertyValue) {
          let componentValueId = '#' + command.propertyValue.component;
          value = document.querySelector(componentValueId).innerHTML;
        } else if ('scopeVariable' in command.propertyValue) {
          console.log(command.propertyValue.scopeVariable);
        }
      } else {
        value = command.propertyValue;
      }
      console.log(value);
      switch (command.propertyAction) {
        case 'BackgroundColor':
          let backgroundColor = '#' + convertDecimaltoHexColor(value);
          document.querySelector(componentId).style.backgroundColor =
            backgroundColor;
          break;
        case 'Text':
          document.querySelector(componentId).innerHTML = value;
      }
    } else if (command.commandType === 'set-global-var-value') {
      console.log('variavel global');
    } else if (command.commandType === 'declare-scope-variable') {
      console.log('variável de escopo');
    } else {
      console.log('não identificado');
    }
  });
};

export { commandToExecute };
