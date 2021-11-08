import {
  convertDecimaltoHexColor
} from '../../../helpers/commandsHelper';

let propertiesStack = [];
let conditionalStack = [];
let propertiesInsideIf = false;
let action = '';
let command = '';
let localVariables = [];
const PI = Math.PI;
const localVariableIndicator = '(let ( ';
const setPropertyIndicator = "(set-and-coerce-property! '";
const setGlobalVariableValue = '(set-var g$';
const conditionalIndicator = '(if (call-yail-primitive ';

const getBlocksCommands = (commands, variables) => {
  let parsedCommand = '';
  for (let i = 0; i < commands.length; i++) {
    if (commands.startsWith(localVariableIndicator, i)) {
      getLocalVariables(commands, i);
    } else if (
      commands.startsWith(setPropertyIndicator, i) &&
      propertiesInsideIf === false
    ) {
      parsedCommand = getPropertyCommands(commands, variables, i);
    } else if (commands.startsWith(conditionalIndicator, i)) {
      parsedCommand = getConditionalCommands(commands, variables, i);
    }
  }
  propertiesStack = [];
  propertiesInsideIf = false;
  return parsedCommand;
};

const getConditionalCommands = (commands, variables, i) => {
  let ifStack = [];
  propertiesInsideIf = true;
  conditionalStack = [];
  let comparisonCommand = '';
  for (let i = 0; i < commands.length; i++) {
    if (commands.startsWith('if', i)) {
      console.log('if')
      ifStack.push('if ');
    } else if (commands.startsWith('(call-yail-primitive', i) && !commands.startsWith('(call-yail-primitive string', i)) {
      ifStack.push('(');
      comparisonCommand = commands
        .substring(i + '(call-yail-primitive'.length + 1)
        .replaceAll(" 'Text)", '')
        .trim()
        .split('(begin   ')[0];
      ifStack.push(compareConditionalValues(comparisonCommand, variables));
      ifStack.push(') {');
      console.log('(' + compareConditionalValues(comparisonCommand, variables) + ') {');
    } else if (commands.startsWith(') (begin   ', i)) {
      ifStack.push(
        commands.substring(i + ') (begin   '.length).split('(begin')[0]
      );
      ifStack.push('}');
      console.log(commands.substring(i + ') (begin   '.length).split('(begin')[0] + '}');
    } else if (commands.startsWith(') (begin (if', i)) {
      ifStack.push(' else ');
    } else if (commands.startsWith(')) (begin   (', i)) {
      console.log(' else {')
      ifStack.push(' else {');
    }
  }

  let commandStack = ifStack.map((element) => {
    let elementToString = element.toString();
    if (elementToString.startsWith(setPropertyIndicator)) {
      for (let i = 0; i < elementToString.length; i++) {
        if (elementToString.startsWith(setPropertyIndicator, i)) {
          conditionalStack.push(getPropertyCommands(element, variables, i));
          propertiesStack = [];
        }
      }
      return conditionalStack.join().replaceAll(',', '');
    }
    return element;
  });

  return removeLastElement(commandStack).join().replaceAll(',', '');
};

function removeLastElement(arr) {
  let lastElement = arr.pop();
  if (lastElement === 'if ') {
    return arr;
  } else {
    arr.push(lastElement);
    return arr;
  }
}

function compareConditionalValues(command, variables) {
  let comparator = command.split(' ')[0];
  //console.log(comparator);
  const termsIndicator = ' (*list-for-runtime* ';
  let terms = command
    .substring(comparator.length + termsIndicator.length)
    .split(") '(")[0];
  let elementsBeforeFilter = terms.split(' ');
  //console.log(elementsBeforeFilter);
  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));

  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));

  let textFieldFilter = localVariableFilter
    .filter((item) => !(item === '(get-property'))
    .map((n) => (n.startsWith("'") ? getTextFieldValue(n) : n));

  //console.log(textFieldFilter);

  return compare(textFieldFilter, comparator);
}

function compare(arr, comparator) {
  let result = false;
  switch (comparator) {
    case '>':
      result = arr[0] > arr[1];
      break;
    case '<':
      result = arr[0] < arr[1];
      break;
    case 'yail-equal?':
      result = arr[0] === arr[1];
      break;
    default:
      result = false;
      break;
  }
  return result;
}

const getPropertyCommands = (commands, variables, i) => {
  command = '';
  let setProperty = '';
  let finalResult = '';
  let fieldValue = '';

  let componentAction = commands
    .substring(i + setPropertyIndicator.length)
    .split(' ')[0];

  let componentType = document.querySelector('#' + componentAction).nodeName;

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

  fieldValue = getValue(value, variables).toString().startsWith('(get-var g$') ?
    getVariableValue(variables, getValue(value, variables)) :
    getValue(value, variables);

  //console.log(typeof fieldValue);

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

  propertiesStack.push(setProperty);
  console.log(propertiesStack);
  finalResult = propertiesStack.join().replaceAll(',', '');
  console.log(finalResult);
  return finalResult.toString();
};

function getLocalVariables(commands, i) {
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
}

function getValue(commandText, variables) {
  let textValue = '';
  let textSubstring = '';
  let operation = '(call-yail-primitive';
  let globalVariable = '(get-var g$';
  let localVariable = '(lexical-value $';
  let textFieldValue = '(get-property';
  if (commandText.startsWith(operation)) {
    textSubstring = commandText
      .substring(operation.length + 1)
      .replaceAll(" 'Text)", '')
      .trim();
    textValue = calculate(textSubstring, variables, localVariables);
  } else if (commandText.startsWith(globalVariable)) {
    textValue = commandText.split(')')[0];
  } else if (commandText.startsWith(textFieldValue)) {
    let componentId =
      '#' + commandText.substring(textFieldValue.length + 2).split(' ')[0];
    let componentType = document.querySelector(componentId).nodeName;
    let componentValue = '';
    if (componentType === 'BUTTON' || componentType === 'INPUT') {
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

  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));

  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));

  let textFieldFilter = localVariableFilter
    .filter((item) => !(item === '(get-property'))
    .map((n) => (n.startsWith("'") ? getTextFieldValue(n) : n));

  let numbers = textFieldFilter.map(Number);
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
    case 'sqrt':
      result = squareRoot(numbers);
      break;
    case 'random-integer':
      result = randomInteger(numbers);
      break;
    case 'random-fraction':
      result = randomFraction();
      break;
    case 'radians->degrees':
      result = radiansToDegrees(numbers);
      break;
    case 'degrees->radians':
      result = degreesToRadians(numbers);
      break;
    case 'min':
      result = minNumber(numbers);
      break;
    case 'max':
      result = maxNumber(numbers);
      break;
    case 'abs':
      result = absNumber(numbers);
      break;
    case 'neg':
      result = negNumber(numbers);
      break;
    case 'log':
      result = logNumber(numbers);
      break;
    case 'exp':
      result = expNumber(numbers);
      break;
    case 'round':
      result = roundNumber(numbers);
      break;
    case 'ceil':
      result = ceilNumber(numbers);
      break;
    case 'floor':
      result = floorNumber(numbers);
      break;
    case 'sin':
      result = sinNumber(numbers);
      break;
    case 'cos':
      result = cosNumber(numbers);
      break;
    case 'tan':
      result = tanNumber(numbers);
      break;
      case 'modulo':
        result = moduloNumber(numbers);
        break;
        case 'remainder':
      result = remainderNumber(numbers);
      break;
      case 'quotient':
      result = quotientNumber(numbers);
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

function getTextFieldValue(value) {
  let fieldName = value.substring(1);
  let fieldType = document.querySelector('#' + fieldName).nodeName;
  let fieldValue = '';
  if (fieldType === 'SPAN') {
    fieldValue = document.querySelector('#' + fieldName).innerHTML ?
      document.querySelector('#' + fieldName).innerHTML :
      0;
  } else {
    fieldValue = document.querySelector('#' + fieldName).value ?
      document.querySelector('#' + fieldName).value :
      0;
  }
  return fieldValue;
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

function squareRoot(arr) {
  return Math.sqrt(arr[0]);
}

function randomInteger(arr) {
  return Math.floor(Math.random() * arr[1]) + arr[0];
}

function randomFraction() {
  return Math.random();
}

function radiansToDegrees(arr) {
  return arr[0] * (180 / PI);
}

function degreesToRadians(arr) {
  return arr[0] * (PI / 180);
}

function minNumber(arr) {
  return Math.min(...arr);
}

function maxNumber(arr) {
  return Math.max(...arr);
}

function absNumber(arr) {
  return Math.abs(arr[0]);
}

function negNumber(arr) {
  return arr[0] * -1;
}

function logNumber(arr) {
  return Math.log(arr[0]);
}

function expNumber(arr) {
  return Math.exp(arr[0]);
}

function roundNumber(arr) {
  return Math.round(arr[0]);
}

function ceilNumber(arr) {
  return Math.ceil(arr[0]);
}

function floorNumber(arr) {
  return Math.floor(arr[0]);
}

function sinNumber(arr) {
  return Math.sin(arr[0] * (PI / 180));
}

function cosNumber(arr) {
  return Math.cos(arr[0] * (PI / 180));
}

function tanNumber(arr) {
  return Math.tan(arr[0] * (PI / 180));
}

function moduloNumber(arr) {
  return ((arr[0] % arr[1]) + arr[1]) % arr[1];
}

function remainderNumber(arr) {
  return arr[0] % arr[1];
}

function quotientNumber(arr) {
  return Math.floor(arr[0] / arr[1]);
}

const replaceQuotes = (value) => {
  let replacedQuotesValue = value.replaceAll('\\"', '');
  return replacedQuotesValue;
};

export {
  getBlocksCommands
};