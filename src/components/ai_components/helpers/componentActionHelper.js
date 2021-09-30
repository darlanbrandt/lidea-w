import { commandToExecute } from './commandsToExecuteHelper';
import { getBlocksCommands } from '../../../helpers/parser/blocks/commandParser';

// Função para executar as ações realizadas no componente
function handleAction(action, componentName, blocks) {
  const commands = blocks.map(({ commands }) => {
    return commands;
  });

  const variables = blocks.map(({ variables }) => {
    return variables;
  });

  const procedures = blocks.map(({ procedures }) => {
    return procedures;
  });
  console.log(commands);

  commands.forEach((command) => {
    command.forEach((c) => {
      if (c.commandType === action) {
        if (c.componentAction === componentName) {
          console.log(c.commandsToExecute);
          //getBlocksCommands(c.commandsToExecute);
          let execute = getBlocksCommands(c.commandsToExecute).toString();
          console.log(execute);
          eval(execute);
          //commandToExecute(getBlocksCommands(c.commandsToExecute), variables);
        }
      }
    });
  });
}

export { handleAction };
