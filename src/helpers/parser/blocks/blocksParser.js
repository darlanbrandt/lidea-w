import { textActions } from './commandParser';

let variables = [];
let localVariables = [];
let commands = [];

let blocks = [];

const dict = [];
const beginOfBlocksCode = '(init-runtime)';
const varGetProperty = "(get-property '";
const varGetFromBlock = '(call-yail-primitive ';
const endOfCommand = '))';
const startOfAction = '()(set-this-form)\\n    ';

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
  localVariables = [];

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
            variableValue = { componentName, componentProperty };
          } else if (varSubstringValue.startsWith(varGetFromBlock)) {
            let componentProperty = varSubstringValue.substring(varGetFromBlock.length);
            if (componentProperty.startsWith('string')) {
              variableValue = textActions(componentProperty, variables, localVariables);
            }
          } else {
            variableValue = varSubstringValue;
          }
          variableInfo = { variableName, variableValue };
          variables = variables.concat(variableInfo);
        } else if (dict[key] === 'command') {
          let commandText = blocksText.substring(i).split(endOfCommand)[0];
          let componentName = commandText.substring(key.length).split(' ')[0];
          let commandType = commandText
            .substring(key.length + componentName.length + 1)
            .split('()')[0];
          let commandUnparsed = commandText
            .substring(
              key.length + componentName.length + commandType.length + startOfAction.length + 1
            )
            .split(')(define-event')[0];
          commands = commands.concat({ componentName, commandType, command: commandUnparsed });
        }
      }
    });
  }
  blocks.push({ variables, commands });
  return blocks;
}

export { getAllBlocks };
