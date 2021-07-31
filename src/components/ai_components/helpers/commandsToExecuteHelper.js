import { convertDecimaltoHexColor } from '../../../helpers/commandsHelper';

// Recebe os comandos e variáveis a serem executados
const commandToExecute = (commands, variables) => {
  commands.forEach((command) => {
    // Verifica se o comando define propriedade a outro componente
    if (command.commandType === 'set-property') {
      let componentId = '#' + command.componentAction;
      let value = '';

      // Se o valor da propriedade é um objeto, realiza iteração
      if (typeof command.propertyValue === 'object') {
        // Se o valor do objeto vem do valor de um componente
        if ('component' in command.propertyValue) {
          let componentValueId = '#' + command.propertyValue.component;
          value = document.querySelector(componentValueId).innerHTML;

          // ou se vem de uma variável local
        } else if ('localVariable' in command.propertyValue) {
          console.log(command.propertyValue.localVariable);

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
          break;
        default:
          break;
      }
      /* or checks if command sets new value to global variable */
    } else if (command.commandType === 'set-global-var-value') {
      console.log('variavel global');
      /* or checks if command sets new value to local variable */
    } else if (command.commandType === 'declare-local-variable') {
      console.log('variável local');
    } else {
      console.log('não identificado');
    }
  });
};

export { commandToExecute };
