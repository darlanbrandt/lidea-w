import { getYAIL } from '../services/yailCode';
import { getAllBlocks } from './parser/blocks/blocksParser';
import { getBlocksCommands } from './parser/blocks/commandsParser';

const getBlocks = async () => {
  /* Get YAIL Code */
  const yail = await getYAIL();

  let blocks = [];

  let procedures = [];

  /* Lists all components in an array */
  const allBlocks = getAllBlocks(yail);

  /* Merges both arrays into a new object */
  const globalVariables = allBlocks.map(({ variables }) => {
    return variables;
  });

  const commands = allBlocks.map(({ commands }) => {
    return commands;
  });

  const blockCommands = getBlocksCommands(commands);

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
  return blocks;
};

export { getBlocks };
