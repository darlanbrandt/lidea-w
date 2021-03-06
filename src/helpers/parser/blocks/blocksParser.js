import { textActions } from './commandParser';

let variables = [];
let localVariables = [];
let commands = [];
//let procedures = [];

let blocks = [];

//const varValues = [];
const dict = [];
const beginOfBlocksCode = '(init-runtime)';
const endOfBlocksCode = '},"componentYail"';
const varGetProperty = "(get-property '";
const varGetFromBlock = '(call-yail-primitive ';
const endOfCommand = '))"';
const startOfAction = '()(set-this-form)\\n    ';
const startOfProcedure = ')  (';

dict['def g'] = 'variable';
dict['(define-event '] = 'command';
dict['(def (p'] = 'procedure';

function getAllBlocks(text) {
  const texto = JSON.stringify(text);
  const startPos = texto.indexOf(beginOfBlocksCode);
  const endPos = texto.length;

  const blocksText = texto.substring(startPos, endPos);

  blocks = [];
  commands = [];
  variables = [];

  for (let i = 0; i < blocksText.length; i++) {
    let variableName = '';
    let variableValue = '';
    Object.keys(dict).forEach((key) => {
      if (blocksText.startsWith(key, i)) {
        if (dict[key] === 'variable') {
          let variableInfo = {};
          variableName = blocksText.substring(i + 6).split(' ')[0];
          let varSubstringValue = blocksText
            .substring(i + 6 + variableName.length + 1)
            .split(')')[0];
          if (varSubstringValue.startsWith(varGetProperty)) {
            let componentName = varSubstringValue
              .substring(varGetProperty.length)
              .split(' ')[0];

            let componentProperty = varSubstringValue.substring(
              varGetProperty.length + componentName.length + 2
            );
            variableValue = {
              componentName: componentName,
              componentProperty: componentProperty,
            };
          } else if (varSubstringValue.startsWith(varGetFromBlock)) {
            let componentProperty = varSubstringValue.substring(
              varGetFromBlock.length
            );
            if (componentProperty.startsWith('string')) {
              variableValue = textActions(
                componentProperty,
                variables,
                localVariables
              );
            }
          } else {
            variableValue = varSubstringValue;
          }

          variableInfo = {
            variableName: variableName,
            variableValue: variableValue,
          };
          variables = variables.concat(variableInfo);
        } else if (dict[key] === 'command') {
          let commandText = blocksText.substring(i).split(endOfCommand)[0];
          let componentName = commandText.substring(key.length).split(' ')[0];
          let commandType = commandText
            .substring(key.length + componentName.length + 1)
            .split('()')[0];
          let commandUnparsed = commandText
            .substring(
              key.length +
                componentName.length +
                commandType.length +
                startOfAction.length +
                1
            )
            .split(')(define-event')[0];
          let commandInfo = {
            componentName: componentName,
            commandType: commandType,
            command: commandUnparsed,
          };
          commands = commands.concat(commandInfo);
          /* TO DO */
          /* Concluir a convers??o de YAIL para as procedures */
          /*
        } else if (dict[key] === 'procedure') {
          let procedureText = blocksText.substring(i).split(endOfCommand)[0];
          let procedureName = procedureText
            .substring(key.length + 1)
            .split(' ')[0];
          let procedureParameter = procedureText
            .substring(key.length + procedureName.length + 3)
            .split(')  ')[0];

          let procedureUnparsed = procedureText.substring(
            key.length +
              procedureName.length +
              procedureParameter.length +
              startOfProcedure.length +
              2
          );
          let procedureInfo = {
            procedureName: procedureName,
            procedureParameter: procedureParameter,
            procedure: procedureUnparsed,
          };
          procedures = procedures.concat(procedureInfo);
        } else {
          //console.log('comando n??o identificado');
          */
        }
      }
    });
  }
  blocks.push({
    variables: variables,
    commands: commands,
  });

  return blocks;
}

export { getAllBlocks };
