import { convertDecimaltoHexColor } from '../../../helpers/commandsHelper';

const dict = [];
const dict2 = [];
let stack = [];
let action = '';
let command = '';
let localVariables = [];
let localVariableIndicator = '(let ( ';
let setPropertyIndicator = "(set-and-coerce-property! '";
let setGlobalVariableValue = '(set-var g$';

dict["(set-and-coerce-property! '"] = 'document.querySelector("#';
dict['(let ( '] = 'local-variable';
dict2['(call-yail-primitive'] = 'operation';
dict2['(get-var g$'] = 'global-variable';

const getBlocksCommands = (commands, variables) => {
  command = '';
  let setProperty = '';
  let finalResult = '';
  let fieldValue = '';

  for (let i = 0; i < commands.length; i++) {
    //Object.keys(dict).forEach((key) => {
    if (commands.startsWith(localVariableIndicator, i)) {
      //if (dict[key] === 'local-variable') {
      let localVariablesText = commands
        .substring(i + localVariableIndicator.length)
        .split(' )')[0];
      let localVariablesTextArray = localVariablesText
        .replaceAll(') (', '&')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .trim()
        .replaceAll('$', '')
        .split('&');
      localVariables.push(
        localVariablesTextArray.map((localVariable) => {
          return {
            variableName: localVariable.split(' ')[0],
            variableValue: localVariable.split(' ')[1],
          };
        })
      );
    } else if (commands.startsWith(setPropertyIndicator, i)) {
      let componentAction = commands
        .substring(i + setPropertyIndicator.length)
        .split(' ')[0];

      let componentType = document.querySelector(
        '#' + componentAction
      ).nodeName;

      let typeToApply = '';

      let type = commands
        .substring(i + setPropertyIndicator.length + componentAction.length + 2)
        .split(' ')[0];

      if (type === 'Text' && componentType === 'INPUT') {
        typeToApply = 'TextInput';
      } else if (type === 'Text' && componentType !== 'INPUT') {
        typeToApply = 'Text';
      } else {
        typeToApply = type;
      }

      let value = commands
        .substring(
          i +
            setPropertyIndicator.length +
            componentAction.length +
            2 +
            type.length +
            1
        )
        .split(") '")[0];

      /*if (getValue(value, variables).toString().startsWith('(get-var g$')) {
        getVariableValue(variables,getValue(value, variables))
      } else if (getValue(value, variables))*/

      fieldValue = getValue(value, variables)
        .toString()
        .startsWith('(get-var g$')
        ? getVariableValue(variables, getValue(value, variables))
        : getValue(value, variables);

      console.log(typeof fieldValue);

      switch (typeToApply) {
        case 'BackgroundColor':
          setProperty =
            'document.querySelector("#' +
            componentAction +
            '").style.backgroundColor = "#' +
            convertDecimaltoHexColor(+fieldValue) +
            '"; ';
          break;
        case 'FontSize':
          setProperty =
            'document.querySelector("#' +
            componentAction +
            '").style.fontSize = ' +
            '"' +
            fieldValue +
            'px"' +
            '; ';
          break;
        case 'Text':
          if (typeof fieldValue === 'number') {
            setProperty =
              'document.querySelector("#' +
              componentAction +
              '").innerHTML = ' +
              '"' +
              fieldValue +
              '"' +
              '; ';
          } else {
            setProperty =
              'document.querySelector("#' +
              componentAction +
              '").innerHTML = ' +
              '"' +
              replaceQuotes(fieldValue) +
              '"' +
              '; ';
          }
          break;
        case 'TextInput':
          setProperty =
            'document.querySelector("#' +
            componentAction +
            '").value = ' +
            '"' +
            replaceQuotes(fieldValue) +
            '"' +
            '; ';
          break;
        case 'TextColor':
          setProperty =
            'document.querySelector("#' +
            componentAction +
            '").style.color = "#' +
            convertDecimaltoHexColor(Number(fieldValue)) +
            '"; ';
          break;
        default:
          break;
      }

      stack.push(setProperty);
      finalResult = stack.join().replaceAll(',', '');
    }
    //});
  }
  //finalResult.replaceAll("'", "\\'");
  stack = [];
  return finalResult.toString();
};

function getValue(commandText, variables) {
  let textValue = '';
  let textSubstring = '';
  let operation = '(call-yail-primitive';
  let globalVariable = '(get-var g$';
  let localVariable = '(lexical-value $';
  let textFieldValue = '(get-property';
  if (commandText.startsWith(operation)) {
    textSubstring = commandText.substring(operation.length + 1).trim();
    textValue = calculate(textSubstring, variables, localVariables);
  } else if (commandText.startsWith(globalVariable)) {
    textValue = commandText.split(')')[0];
  } else if (commandText.startsWith(textFieldValue)) {
    console.log(commandText.substring(textFieldValue.length));
    let componentId =
      '#' + commandText.substring(textFieldValue.length + 2).split(' ')[0];
    let componentType = document.querySelector(componentId).nodeName;
    console.log(componentType);
    let componentValue = '';
    if (componentType === 'BUTTON') {
      componentValue = document.querySelector(componentId).value;
    } else {
      componentValue = document.querySelector(componentId).innerHTML;
    }
    textValue = componentValue;
  } else {
    textValue = commandText.split(" '")[0];
  }
  return textValue;
}

function calculate(calculationText, variables, localVariables) {
  console.log(calculationText);
  let result = 0;
  let operator = calculationText.split(' ')[0];
  const numberIndicator = ' (*list-for-runtime* ';
  let elementsBeforeFilter = calculationText
    .substring(operator.length + numberIndicator.length)
    .split(' ');
  console.log(elementsBeforeFilter);
  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));
  console.log(globalVariableFilter);
  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));
  console.log(localVariableFilter);

  /*let numbersArray = calculationText
    .substring(operator.length + numberIndicator.length)
    .split(' ')
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));*/

  let numbers = localVariableFilter.map(Number);

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

function getVariableValue(variables, value) {
  let variableName = '';
  let variableValue = '';
  if (value.startsWith('(get-var g$')) {
    variableName = value.substring('(get-var g$'.length).split(')')[0];
    variableValue = getVarValue(variables, variableName);
  } else if (value.startsWith('g$')) {
    variableName = value.substring('g$'.length).split(')')[0];
    variableValue = getVarValue(variables, variableName);
  } else if (value.startsWith('(lexical-value $')) {
    variableName = value.substring('(lexical-value $'.length).split(')')[0];
    variableValue = getVarValue(variables, variableName);
  } else if (value.startsWith('$')) {
    variableName = value.substring('$'.length).split(')')[0];
    variableValue = getVarValue(variables, variableName);
  }
  return getVarValue(variables, variableName);
}

function getVarValue(variables, value) {
  let variableValue = '';
  variables.forEach((variable) => {
    variable.forEach((v) => {
      if (value === v.variableName) {
        variableValue = v.variableValue;
      }
    });
  });
  return variableValue;
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

const replaceQuotes = (value) => {
  let replacedQuotesValue = value.replaceAll('\\"', '');
  return replacedQuotesValue;
};

export { getBlocksCommands };
