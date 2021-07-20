import { getComponentCode } from './componentsActions/actionsHelper';

let variables = [];
let commands = [];
let procedures = [];

let blocksData = [];

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
  blocksData.push({ variables: variables, commands: commands });
  console.log(blocksData);

  let teste = getComponentCode('B1', blocksData);
  console.log(teste);

  return blocksData;
}

function convertDecimaltoHexColor(decimal) {
  let size = 8;

  if (decimal >= 0) {
    var hexadecimal = decimal.toString(16);

    while (hexadecimal.length % size != 0) {
      hexadecimal = '' + 0 + hexadecimal;
    }

    return hexadecimal;
  } else {
    var hexadecimal = Math.abs(decimal).toString(16);
    while (hexadecimal.length % size != 0) {
      hexadecimal = '' + 0 + hexadecimal;
    }

    var output = '';
    for (let i = 0; i < hexadecimal.length; i++) {
      output += (0x0f - parseInt(hexadecimal[i], 16)).toString(16);
    }

    output = (0x01 + parseInt(output, 16)).toString(16);
    output = output.substring(2);
    return output;
  }
}

export { getAllBlocks };
