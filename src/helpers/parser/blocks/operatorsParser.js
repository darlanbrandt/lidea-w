const getOperation = (commandText) => {
  const operationText = commandText.trim();
  console.log(operationText);
  const start = '(call-yail-primitive ';
  const startOfOperation = '(*list-for-runtime* ';
  const getGlobalVar = '(get-var g';
  const getLocalVar = '(lexical-value ';
  let operation = {};
  let operator = operationText.substring(start.length).split(' (')[0];
  operator = operator.replaceAll(' ', '');

  let var1, var2;
  let var1Text = commandText
    .substring(start.length + operator.length + 1 + startOfOperation.length + 1)
    .split(') ')[0];

  if (var1Text.startsWith(getGlobalVar)) {
    var1 = var1Text.substring(getGlobalVar.length + 1).split(')')[0];
  } else if (var1Text.startsWith(getLocalVar)) {
    var1 = var1Text.substring(getLocalVar.length + 1).split(')')[0];
  } else {
    var1 = var1Text.split(')')[0];
  }

  let var2Text = commandText
    .substring(
      start.length +
        operator.length +
        1 +
        startOfOperation.length +
        var1Text.length +
        3
    )
    .split(') ')[0];
  //console.log(var2Text);
  if (var2Text.startsWith(getGlobalVar)) {
    var2 = var2Text.substring(getGlobalVar.length + 1).split(')')[0];
  } else if (var2Text.startsWith(getLocalVar)) {
    var2 = var2Text.substring(getLocalVar.length + 1).split(')')[0];
  } else {
    var2 = var2Text.split(')')[0];
  }
  operation = {
    var1: replaceQuotes(var1),
    operator: replaceQuotes(operator),
    var2: replaceQuotes(var2),
  };
  return operation;
};

const replaceQuotes = (value) => {
  let replacedQuotesValue = value.replaceAll('\\"', '');
  return replacedQuotesValue;
};

export { getOperation };
