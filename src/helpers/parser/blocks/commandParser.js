import { convertDecimaltoHexColor } from '../../../helpers/commandsHelper';

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
const listIndicator = 'call-yail-primitive yail-list';
const TRUE = true.toString();
const FALSE = false.toString();
const SPLIT_CHARACTER = 'character';
const SPLIT_SPACES = 'spaces';
const SPLIT_FIRST = 'first';
const EQUAL = 'yail-equal';
const NOT_EQUAL = 'yail-not-equal';
const LESS_THAN = '<';
const LESS_EQUAL = '<=';
const GREATER_THAN = '>';
const GREATER_EQUAL = '>=';
const BITWISE_AND = 'and';
const BITWISE_OR = 'or';
const BITWISE_XOR = 'xor';

const getBlocksCommands = (commands, variables) => {
  propertiesStack = [];
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
    } else if (commands.startsWith(listIndicator, i)) {
      console.log('Comando de Lista');
    }
  }
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
      ifStack.push('if ');
    } else if (
      commands.startsWith('(call-yail-primitive', i) &&
      !commands.startsWith('(call-yail-primitive string', i)
    ) {
      ifStack.push('(');
      comparisonCommand = commands
        .substring(i + '(call-yail-primitive'.length + 1)
        .replaceAll(" 'Text)", '')
        .trim()
        .split('(begin   ')[0];

      ifStack.push(compareConditionalValues(comparisonCommand, variables));

      ifStack.push(') {');
    } else if (commands.startsWith(') (begin   ', i)) {
      ifStack.push(
        commands.substring(i + ') (begin   '.length).split('(begin')[0]
      );
      ifStack.push('}');
    } else if (commands.startsWith(') (begin (if', i)) {
      ifStack.push(' else ');
    } else if (commands.startsWith(')) (begin   (', i)) {
      ifStack.push(' else {');
    }
  }
  console.log(ifStack);

  let commandStack = ifStack.map((element) => {
    if (element.toString().startsWith(setPropertyIndicator)) {
      return getPropertyCommands(element, variables, 0);
    } else if (element.toString().startsWith(conditionalIndicator)) {
      return getConditionalCommands(element, variables, 0);
    } else {
      return element;
    }
  });

  console.log(
    removeLastElement(commandStack)
      .join()
      .replaceAll(',', '')
      .replaceAll('(false) { else', ' else')
      .replaceAll('; }(false) {', ';')
  );
  return removeLastElement(commandStack)
    .join()
    .replaceAll(',', '')
    .replaceAll('(false) { else', ' else')
    .replaceAll('; }(false) {', ';');
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
  //console.log(command);
  let comparator = command.split(' ')[0];
  //console.log(comparator);
  const termsIndicator = ' (*list-for-runtime* ';
  let terms = command
    .substring(comparator.length + termsIndicator.length)
    .split(") '(")[0]
    .replaceAll('\\"', '');
  let elementsBeforeFilter = terms.split(' ');
  //console.log(elementsBeforeFilter);
  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));
  //console.log(globalVariableFilter);
  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));
  //console.log(localVariableFilter);
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
  let amountOfProperties = (commands.match(/set-and-coerce-property!/g) || [])
    .length;
  if (amountOfProperties === 1) {
    propertiesStack = [];
  }

  console.log(commands);
  command = '';
  let setProperty = '';
  let finalResult = '';
  let fieldValue = '';

  let componentAction = commands
    .substring(i + setPropertyIndicator.length)
    .split(' ')[0];
  console.log(componentAction);

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
  console.log(value);

  fieldValue = getValue(value, variables).toString().startsWith('(get-var g$')
    ? getVariableValue(variables, getValue(value, variables))
    : getValue(value, variables);

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
          '").textContent = ' +
          '"' +
          fieldValue +
          '"' +
          '; ';
      } else {
        setProperty =
          'document.querySelector("#' +
          componentAction +
          '").textContent = ' +
          '"' +
          replaceQuotes(fieldValue) +
          '"' +
          '; ';
      }
      break;
    case 'TextInput':
      if (typeof fieldValue === 'number') {
        setProperty =
          'document.querySelector("#' +
          componentAction +
          '").value = ' +
          '"' +
          fieldValue +
          '"' +
          '; ';
      } else {
        setProperty =
          'document.querySelector("#' +
          componentAction +
          '").value = ' +
          '"' +
          replaceQuotes(fieldValue) +
          '"' +
          '; ';
      }
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
    if (textSubstring.startsWith('string')) {
      textValue = textActions(textSubstring, variables, localVariables);
    } else if (
      textSubstring.startsWith('make-yail-list') ||
      textSubstring.startsWith('yail-list')
    ) {
      textValue = listActions(textSubstring, variables, localVariables);
    } else {
      textValue = calculate(textSubstring, variables, localVariables);
    }
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
      componentValue = document.querySelector(componentId).textContent;
    }
    textValue = componentValue;
  } else {
    textValue = commandText.split(" '")[0];
  }
  return textValue;
}

function listActions(listString, variables, localVariables) {
  console.log(listString);
  let result = [];
  let operator = listString.split(' ')[0];
  console.log(operator);
  const listIndicator = ' (*list-for-runtime* ';
  let elementsBeforeFilter = '';
  let listElements = listString
    .substring(operator.length + listIndicator.length)
    .replaceAll('\\', '')
    .replaceAll(' make-yail-list', '')
    .replaceAll(' (*list-for-runtime*', '')
    .replaceAll('(call-yail-primitive ', '');

  /*console.log(listElements.split(' '));
  console.log(listElements);*/
  if (
    listElements.startsWith('(get-var') ||
    listElements.startsWith('(lexical-value') ||
    listElements.startsWith('(get-property')
  ) {
    elementsBeforeFilter = listElements.split(' ');
  } else {
    elementsBeforeFilter = listElements.split('" "');
  }

  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));

  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));

  let textFieldFilter = localVariableFilter
    .filter((item) => !(item === '(get-property'))
    .map((n) => (n.startsWith("'") ? getTextFieldValue(n) : n));

  let removedQuotes = textFieldFilter.map((text) =>
    text.startsWith('"') || text.endsWith('"') ? text.replaceAll('"', '') : text
  );
  console.log(removedQuotes);

  switch (operator) {
    case 'yail-list-reverse':
      console.log(removedQuotes.reverse());
  }

  return result;
}

function textActions(textString, variables, localVariables) {
  console.log(textString);
  let result = '';
  let operator = textString.split(' ')[0];
  console.log(operator);
  const textIndicator = ' (*list-for-runtime* ';
  let elementsBeforeFilter = '';
  let textElements = textString
    .substring(operator.length + textIndicator.length)
    .replaceAll('\\', '');
  console.log(textElements);
  if (
    textElements.startsWith('(get-var') ||
    textElements.startsWith('(lexical-value') ||
    textElements.startsWith('(get-property')
  ) {
    elementsBeforeFilter = textElements.split(' ');
  } else {
    elementsBeforeFilter = textElements.split('" "');
  }

  let globalVariableFilter = elementsBeforeFilter
    .filter((item) => !(item === '(get-var'))
    .map((n) => (n.startsWith('g$') ? getVariableValue(variables, n) : n));

  let localVariableFilter = globalVariableFilter
    .filter((item) => !(item === '(lexical-value'))
    .map((n) => (n.startsWith('$') ? getVariableValue(localVariables, n) : n));

  let textFieldFilter = localVariableFilter
    .filter((item) => !(item === '(get-property'))
    .map((n) => (n.startsWith("'") ? getTextFieldValue(n) : n));

  let removedQuotes = textFieldFilter.map((text) =>
    text.startsWith('"') || text.endsWith('"') ? text.replaceAll('"', '') : text
  );
  console.log(removedQuotes);

  switch (operator) {
    case 'string-append':
      result = joinText(removedQuotes);
      break;
    case 'string-length':
      result = lengthText(removedQuotes);
      break;
    case 'string-empty?':
      result = emptyText(removedQuotes);
      break;
    case 'string<?':
      result = compareText(removedQuotes, LESS_THAN);
      break;
    case 'string=?':
      result = compareText(removedQuotes, EQUAL);
      break;
    case 'string>?':
      result = compareText(removedQuotes, GREATER_THAN);
      break;
    case 'string-trim':
      result = trimText(removedQuotes);
      break;
    case 'string-to-lower-case':
      result = lowercaseText(removedQuotes);
      break;
    case 'string-to-upper-case':
      result = uppercaseText(removedQuotes);
      break;
    case 'string-reverse':
      result = reverseText(removedQuotes);
      break;
    case 'string-starts-at':
      result = startsAtText(removedQuotes);
      break;
    case 'string-contains':
      result = containsText(removedQuotes);
      break;
    case 'string-split':
      result = splitText(removedQuotes, SPLIT_CHARACTER);
      break;
    case 'string-split-at-first':
      result = splitText(removedQuotes, SPLIT_FIRST);
      break;
    case 'string-split-at-spaces':
      result = splitText(removedQuotes, SPLIT_SPACES);
      break;
    case 'string?':
      result = isStringText(removedQuotes);
      break;
    case 'string-substring':
      result = substringText(removedQuotes);
      break;
    case 'string-replace-all':
      result = replaceText(removedQuotes);
      break;
    default:
      break;
  }

  return result;
}

function calculate(calculationText, variables, localVariables) {
  console.log(calculationText);
  let result = 0;
  let operator = calculationText.split(' ')[0];
  console.log(operator);
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
    case 'yail-equal':
      result = compareNumbers(numbers, EQUAL);
      break;
    case 'yail-not-equal':
      result = compareNumbers(numbers, NOT_EQUAL);
      break;
    case '<':
      result = compareNumbers(numbers, LESS_THAN);
      break;
    case '<=':
      result = compareNumbers(numbers, LESS_EQUAL);
      break;
    case '>':
      result = compareNumbers(numbers, GREATER_THAN);
      break;
    case '>=':
      result = compareNumbers(numbers, GREATER_EQUAL);
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
    case 'is-number?':
      result = isNumber(numbers);
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
    case 'asin':
      result = asinNumber(numbers);
      break;
    case 'acos':
      result = acosNumber(numbers);
      break;
    case 'atan':
      result = atanNumber(numbers);
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
    case 'format-as-decimal':
      result = decimalNumber(numbers);
      break;
    case 'math-convert-dec-hex':
      result = decimalToHexNumber(numbers);
      break;
    case 'math-convert-hex-dec':
      result = HexToDecimalNumber(numbers);
      break;
    case 'math-convert-dec-bin':
      result = decimalToBinaryNumber(numbers);
      break;
    case 'math-convert-bin-dec':
      result = binaryToDecimalNumber(numbers);
      break;
    case 'is-number?':
      result = isNumber(numbers);
      break;
    case 'bitwise-and':
      result = bitwiseNumber(numbers, BITWISE_AND);
      break;
    case 'bitwise-ior':
      result = bitwiseNumber(numbers, BITWISE_OR);
      break;
    case 'bitwise-xor':
      result = bitwiseNumber(numbers, BITWISE_XOR);
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
    fieldValue = document.querySelector('#' + fieldName).textContent
      ? document.querySelector('#' + fieldName).textContent
      : '';
  } else {
    fieldValue = document.querySelector('#' + fieldName).value
      ? document.querySelector('#' + fieldName).value
      : '';
  }
  return fieldValue;
}

/*======================= MATH BLOCKS =======================*/

function addition(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function subtraction(arr) {
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

function compareNumbers(arr, type) {
  switch (type) {
    case EQUAL:
      return arr[0] === arr[1];
    case NOT_EQUAL:
      return arr[0] !== arr[1];
    case LESS_THAN:
      return arr[0] < arr[1];
    case LESS_EQUAL:
      return arr[0] <= arr[1];
    case GREATER_THAN:
      return arr[0] > arr[1];
    case GREATER_EQUAL:
      return arr[0] >= arr[1];
    default:
      break;
  }
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
  return (arr[0] || arr) * (180 / PI);
}

function degreesToRadians(arr) {
  return (arr[0] || arr) * (PI / 180);
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
  return Math.sin(degreesToRadians(arr[0]));
}

function cosNumber(arr) {
  return Math.cos(degreesToRadians(arr[0]));
}

function tanNumber(arr) {
  return Math.tan(degreesToRadians(arr[0]));
}

function asinNumber(arr) {
  return Math.asin(degreesToRadians(arr[0]));
}

function acosNumber(arr) {
  return Math.acos(degreesToRadians(arr[0]));
}

function atanNumber(arr) {
  return Math.atan(degreesToRadians(arr[0]));
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

function decimalNumber(arr) {
  return arr[0].toFixed(arr[1]);
}

function isNumber(arr) {
  console.log(arr[0]);
  console.log(Number(arr[0]));
  return typeof Number(arr[0]) === 'number' ? true : false;
}

function decimalToBinaryNumber(arr) {
  return (arr[0] >>> 0).toString(2);
}

function binaryToDecimalNumber(arr) {
  return parseInt(arr[0], 2).toString(10);
}

function decimalToHexNumber(arr) {
  return arr[0].toString(16);
}

function HexToDecimalNumber(arr) {
  return parseInt(arr[0], 16);
}

function bitwiseNumber(arr, type) {
  let result = arr[0];
  const arrayLength = arr.length;

  switch (type) {
    case BITWISE_AND:
      for (let i = 0; i < arrayLength; i++) {
        result = result & arr[i];
      }
      break;
    case BITWISE_OR:
      for (let i = 0; i < arrayLength; i++) {
        result = result | arr[i];
      }
      break;
    case BITWISE_XOR:
      for (let i = 0; i < arrayLength; i++) {
        result = result ^ arr[i];
      }
      break;
    default:
      break;
  }
  return result;
}

/*======================= TEXT BLOCKS =======================*/

function joinText(arr) {
  return arr.join().replaceAll(',', '');
}

function lengthText(arr) {
  return arr[0].length;
}

function emptyText(arr) {
  return arr[0] === null ? true : false;
}

function trimText(arr) {
  return arr[0].trim();
}

function compareText(arr, comparator) {
  let comparisonResult = arr[0].localeCompare(arr[1]);
  switch (comparisonResult) {
    case -1:
      return comparator === LESS_THAN ? true : false;
    case 0:
      return comparator === EQUAL ? true : false;
    case 1:
      return comparator === GREATER_THAN ? true : false;
    default:
      break;
  }
}

function lowercaseText(arr) {
  return arr[0].toLowerCase();
}

function uppercaseText(arr) {
  return arr[0].toUpperCase();
}

function reverseText(arr) {
  return arr[0].split('').reverse().join('').replaceAll(',', '');
}

function startsAtText(arr) {
  return arr[0].indexOf(arr[1]) + 1;
}

function containsText(arr) {
  return arr[0].includes(arr[1]).toString();
}

function splitText(arr, type) {
  let splitString = [];
  let finalString = '';
  switch (type) {
    case SPLIT_CHARACTER:
      splitString = arr[0].split(arr[1]);
      break;
    case SPLIT_SPACES:
      splitString = arr[0].split(' ');
      console.log(splitString);
      break;
    case SPLIT_FIRST:
      const [firstPart, ...rest] = arr[0].split(arr[1]);
      const lastPart = rest.join(arr[1]);
      splitString = [firstPart, lastPart];
    default:
      break;
  }
  finalString = '[';
  splitString.forEach((element) => {
    finalString += `'${element}' ,`;
  });
  finalString = finalString.replace(/,\s*$/, '');
  finalString += ']';
  console.log(splitString);
  return splitString;
}

function isStringText(arr) {
  return Number.isNaN(Number(arr[0])) ? true : false;
}

function substringText(arr) {
  const stringLength = arr[0].length;
  const splitPositionArray = [];
  for (let i = 0; i < stringLength; i++) {
    if (arr[0][i] === ' ') {
      splitPositionArray.push(i);
    }
  }
  const initialPos = Number(
    arr[0]
      .substring(splitPositionArray[splitPositionArray.length - 2] + 1)
      .split(' ')[0]
  );
  const substringLength = Number(
    arr[0]
      .substring(splitPositionArray[splitPositionArray.length - 1] + 1)
      .split(' ')[0]
  );
  const finalString = arr[0].substring(
    0,
    splitPositionArray[splitPositionArray.length - 2]
  );
  const finalResult = finalString.substring(
    initialPos,
    initialPos + substringLength
  );
  console.log(finalString);
  return finalResult;
}

function replaceText(arr) {
  return arr[0].replaceAll(arr[1], arr[2]);
}

/*======================= LIST BLOCKS =======================*/

const replaceQuotes = (value) => {
  let replacedQuotesValue = value.toString().replaceAll('\\"', '');
  return replacedQuotesValue;
};

export { getBlocksCommands, textActions, listActions };
