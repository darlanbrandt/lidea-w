let variables = [];
let commands = [];
let procedures = [];

let blocks = [];

//const varValues = [];
const dict = [];
const beginOfBlocksCode = 'blockYail';
const endOfBlocksCode = '},"componentYail"';
const varGetProperty = "(get-property '";
const endOfCommand = '))"';
const startOfAction = '()(set-this-form)\\n    ';

dict['def g'] = 'variable';
dict['(define-event '] = 'command';
dict['(def (p'] = 'procedure';

function getAllBlocks(text) {
  const texto = JSON.stringify(text);
  const startPos = texto.indexOf(beginOfBlocksCode);
  const endPos = texto.indexOf(endOfBlocksCode);

  const blocksText = texto.substring(startPos, endPos);

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
          let commandUnparsed = commandText.substring(
            key.length +
              componentName.length +
              commandType.length +
              startOfAction.length +
              1
          );
          let commandInfo = {
            componentName: componentName,
            commandType: commandType,
            command: commandUnparsed,
          };
          commands = commands.concat(commandInfo);
        } else if (dict[key] === 'procedure') {
          //console.log('procedure');
        } else {
          //console.log('comando não identificado');
        }
      }
    });
  }
  //console.log(variables);
  //console.log(commands);
  blocks.push({ variables: variables, commands: commands });

  return blocks;
}

export { getAllBlocks };