import { getYAIL } from '../services/yailCode';
import { getAllBlocks } from './parser/blocks/blocksParser';
import { getBlocksCommands } from './parser/blocks/commandsParser';

const getBlocks = async () => {
  /* Get YAIL Code */
  const yail = await getYAIL();

  let blocks = [];

  let variables = [];

  let procedures = [];

  let fullBlockInfo = [];

  /* Lists all components in an array */
  const allBlocks = getAllBlocks(yail);

  /* Merges both arrays into a new object */
  const globalVariables = allBlocks.map(({ variables }) => {
    return variables;
  });

  globalVariables.forEach((variable) => {
    variables = variables.concat(variable);
  });

  const commands = allBlocks.map(({ commands }) => {
    return commands;
  });

  commands.forEach((command) => {
    command.forEach((c) => {
      const blockCommands = getBlocksCommands(c.command);

      let blockInfo = {
        componentAction: c.componentName,
        commandType: c.commandType,
        commandsToExecute: blockCommands,
      };
      fullBlockInfo = fullBlockInfo.concat(blockInfo);
    });
  });
  console.log(fullBlockInfo);

  Object.keys(allBlocks).forEach((abKey) => {
    /*Object.keys(allComponentsProperties).forEach((cKey) => {
      let componentProperty = allComponentsProperties[cKey];

      if (cValue.componentName === cKey) {
        componentObject = {
          componentType: cValue.componentType,
          componentName: cValue.componentName,
          componentProperties: componentProperty,
          parentComponent: cValue.parentComponent,
          parentIsScreen: parentIsScreen,
        };
        components = components.concat(componentObject);
      }
    });*/
  });
  blocks.push({ variables: variables, commands: fullBlockInfo });

  return blocks;
};

export { getBlocks };
