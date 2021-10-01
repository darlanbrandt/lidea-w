import { convertDecimaltoHexColor } from '../../../helpers/commandsHelper';

const dict = [];
const dict2 = [];
let stack = [];
let action = '';
let command = '';

dict["(set-and-coerce-property! '"] = 'document.querySelector("#';
dict2['(call-yail-primitive'] = 'operation';
dict2['(get-var g$'] = 'global-variable';

const getBlocksCommands = (commands, variables) => {
  command = '';
  let variableValue = '';
  let finalResult = '';
  let fieldValue = '';

  for (let i = 0; i < commands.length; i++) {
    Object.keys(dict).forEach((key) => {
      if (commands.startsWith(key, i)) {
        let componentAction = commands.substring(i + key.length).split(' ')[0];

        let type = commands
          .substring(i + key.length + componentAction.length + 2)
          .split(' ')[0];

        let value = commands
          .substring(
            i + key.length + componentAction.length + 2 + type.length + 1
          )
          .split(')')[0];

        fieldValue = getValue(value);

        variables.forEach((variable) => {
          variable.forEach((v) => {
            if (fieldValue === v.variableName) {
              variableValue = v.variableValue;
              console.log(variableValue);
            }
          });
        });

        switch (type) {
          case 'BackgroundColor':
            action =
              'style.backgroundColor = "#' +
              convertDecimaltoHexColor(+fieldValue) +
              '"; ';
            break;
          case 'FontSize':
            action = 'style.fontSize = ' + '"' + fieldValue + 'px"' + '; ';
            break;
          case 'Text':
            action = 'innerHTML = ' + '"' + fieldValue + '"' + '; ';
            break;
          case 'TextColor':
            action =
              'style.color = "#' +
              convertDecimaltoHexColor(+fieldValue) +
              '"; ';
            break;
          default:
            break;
        }

        stack.push(dict[key]);
        stack.push(componentAction + '").');
        stack.push(action);
        finalResult = stack.join().replaceAll(',', '');
      }
    });
  }
  finalResult.replaceAll("'", "\\'");
  stack = [];
  console.log(finalResult);
  return finalResult.toString();
};

function getValue(commandText) {
  console.log(commandText);
  let textValue = '';
  let textSubstring = '';
  let operation = '(call-yail-primitive';
  let globalVariable = '(get-var g$';
  if (commandText.startsWith(operation)) {
    textSubstring = commandText.substring(operation.length + 1).trim();
    textValue = calculate(textSubstring);
  } else if (commandText.startsWith(globalVariable)) {
    textSubstring = commandText.substring(globalVariable.length).split(')')[0];
    textValue = textSubstring;
  } else {
    textValue = commandText.split(' ')[0];
  }

  return textValue;
}

function calculate(calculationText) {
  let result = 0;
  let operator = calculationText.split(' ')[0];
  console.log(operator);
  const numberIndicator = ' (*list-for-runtime* ';
  let numbers = calculationText
    .substring(operator.length + numberIndicator.length)
    .split(')')[0]
    .split(' ')
    .map(Number);
  console.log(numbers);
  switch (operator) {
    case '+':
      result = addition(numbers);
      break;
    case '-':
      result = subtraction(numbers);
      break;
    case '*':
      result = multiplication(numbers);
      break;
    case 'yail-divide':
      result = division(numbers);
      break;
    default:
      break;
  }
  return result;
}

function getValueFromVariable(variableName) {
  return null;
}

function addition(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function subtraction(arr) {
  /*  CÓDIGO PARA SUBTRAÇÃO DE MAIS DE DOIS ITENS EM UM ARRAY */
  /*
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    if (typeof total !== 'number') {
      return false;
    }
    for (var i = 1, length = arr.length; i < length; i++) {
      if (typeof arr[i] === 'number') {
        total -= arr[i];
      } else return false;
    }
    return total;
  } else return false;
  */
  return arr[0] - arr[1];
}

function multiplication(arr) {
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result *= arr[i];
  }
  return result;
}

function division(arr) {
  return arr[0] / arr[1];
}

export { getBlocksCommands };
