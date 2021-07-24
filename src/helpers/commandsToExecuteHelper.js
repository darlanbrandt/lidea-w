import { convertDecimaltoHexColor } from './commandsHelper';

const commandToExecute = (commands) => {
  commands.forEach((command) => {
    if (command.commandType === 'set-property') {
      let componentId = '#' + command.componentAction;

      switch (command.propertyAction) {
        case 'BackgroundColor':
          let backgroundColor =
            '#' + convertDecimaltoHexColor(command.propertyValue);
          document.querySelector(componentId).style.backgroundColor =
            backgroundColor;
          break;
        case 'Text':
          document.querySelector(componentId).innerHTML = command.propertyValue;
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
