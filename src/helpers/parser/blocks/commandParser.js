import { convertDecimaltoHexColor } from '../../../helpers/commandsHelper';

const dict = [];
const dict2 = [];
let pilha = [];
let action = '';
let command = '';

dict["(set-and-coerce-property! '"] = 'document.querySelector("#';
dict2['call-yail-primitive'] = 'operation';

const getBlocksCommands = (commands) => {
  command = '';
  let finalResult = '';
  let calcValue = '';
  console.log(commands);
  for (let i = 0; i < commands.length; i++) {
    Object.keys(dict).forEach((key) => {
      if (commands.startsWith(key, i)) {
        let componentAction = commands.substring(key.length).split(' ')[0];
        let type = commands
          .substring(key.length + componentAction.length + 2)
          .split(' (')[0];
        let value = commands.substring(
          key.length + componentAction.length + 2 + type.length + 1
        );
        calcValue = getValue(value);
        switch (type) {
          case 'BackgroundColor':
            action =
              'style.backgroundColor = "#' +
              convertDecimaltoHexColor(calcValue) +
              '"';
            break;
          case 'Text':
            action = 'innerHTML = ' + calcValue;
            break;
          default:
            break;
        }

        console.log(calcValue);
        pilha.push(dict[key]);
        console.log(dict[key]);
        pilha.push(componentAction + '").');
        console.log(componentAction);
        pilha.push(action);
        console.log(action);
        /*pilha.push(calcValue);
        console.log(calcValue);*/
        finalResult = pilha.join().replaceAll(',', '');
        pilha = [];

        //pilha.push(dict[key]);
        //pilha.push(componentAction);
        //console.log(pilha);
        //console.log(JSON.stringify(pilha));
      }
    });
  }
  finalResult.replaceAll("'", "\\'");
  console.log(finalResult);
  return finalResult.toString();
};

function getValue(commandText) {
  let calculationText = '';
  for (let i = 0; i < commandText.length; i++) {
    Object.keys(dict2).forEach((key) => {
      if (dict2[key] === 'operation') {
        calculationText = commandText.substring(key.length + 2);
        //console.log(calculate(calculationText));
      }
    });
  }
  return calculate(calculationText);
}

function calculate(calculationText) {
  let result = 0;
  let operator = calculationText.split(' ')[0];
  const numberIndicator = ' (*list-for-runtime* ';
  let numbers = calculationText
    .substring(operator.length + numberIndicator.length)
    .split(')')[0]
    .split(' ')
    .map(Number);
  //console.log(numbers);
  switch (operator) {
    case '+':
      result = addition(numbers);
      break;
    case '-':
      result = subtraction(numbers);
      break;
    default:
      break;
  }
  return result;
  //for (let i = 0; i < calculationText.length; i++) {}
}

function addition(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function subtraction(arr) {
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
}

function multiplication(arr) {
  return null;
}

function division(arr) {
  return null;
}

export { getBlocksCommands };
