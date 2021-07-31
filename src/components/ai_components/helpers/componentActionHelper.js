import { commandToExecute } from './commandsToExecuteHelper';

// Função para executar as ações realizadas no componente
function handleAction(action, commands, componentName, variables) {
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

export { handleAction };
