import { getAllBlocks } from './parser/blocks/blocksParser';

const getBlocks = async (yail) => {
  let blocks = [];
  let variables = [];

  let fullCommandBlockInfo = [];

  //let fullProcedureBlockInfo = [];

  // Lista todos os componentes em um array
  const allBlocks = getAllBlocks(yail);

  // Une os arrays de variáveis, commmandos e procedures em um novo objeto
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
      let commandBlockInfo = {
        componentAction: c.componentName,
        commandType: c.commandType,
        commandsToExecute: c.command,
      };
      fullCommandBlockInfo = fullCommandBlockInfo.concat(commandBlockInfo);
    });
  });

  /* TO DO */
  /* Concluir a conversão de YAIL para as procedures */
  /*
          const procedures = allBlocks.map(({ procedures }) => {
    return procedures;
  });

  procedures.forEach((procedure) => {
    procedure.forEach((p) => {
      let procedureBlockInfo = {
        procedureName: p.procedureName,
        procedureParameter: p.procedureParameter,
        proceduresToExecute: p.procedure,
      };
      fullProcedureBlockInfo =
        fullProcedureBlockInfo.concat(procedureBlockInfo);
    });
  });
  */

  Object.keys(allBlocks).forEach((abKey) => {});
  blocks.push({
    variables: variables,
    commands: fullCommandBlockInfo,
    //procedures: fullProcedureBlockInfo,
  });

  return blocks;
};

export { getBlocks };
