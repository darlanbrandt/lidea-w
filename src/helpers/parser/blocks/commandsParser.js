const dict = [];

const getProperty = "(get-property '";
const getGlobalVarValue = '(get-var g';
const getScopeVarValue = '(lexical-value ';
const operationIndicator = ' (call-yail-primitive';
let componentProperty = '';
let commandInfo = {};
let commandsSetProperty = [];
let isElseIf = false;
let isElse = false;

dict["(set-and-coerce-property! '"] = 'set-property';
dict['(set-var! g'] = 'set-global-var-value';
dict['(let ( ('] = 'declare-local-variable';
dict['(if '] = 'opening-if';
dict['))(if '] = 'following-if';
dict['(begin (if '] = 'else-if';

const getBlocksCommands = (commands) => {
  let allCommands = [];

  for (let i = 0; i < commands.length; i++) {
    let commandsProgress = commands.substring(i);
    Object.keys(dict).forEach((key) => {
      if (commands.startsWith(key, i)) {
        /* Verifica se o comando é do tipo Set Property e  
        retorna o objeto com os valores a serem definidos */
        if (dict[key] === 'set-property') {
          //   // Retorna o componente onde a ação será executada
          //   let componentNameAction = commands
          //     .substring(i + key.length)
          //     .split(' ')[0];
          //   /* Return which property will be set on action */
          //   let componentPropertyAction = commands
          //     .substring(i + key.length + componentNameAction.length + 2)
          //     .split(' ')[0];
          //   /*Return value of property to be set on action */
          //   let varPropertyValue = commands
          //     .substring(
          //       i +
          //         key.length +
          //         componentNameAction.length +
          //         2 +
          //         componentPropertyAction.length +
          //         1
          //     )
          //     .split(')')[0];
          //   let propertyValue = '';
          //   /* Checks if property value comes from another component */
          //   if (varPropertyValue.startsWith(getProperty)) {
          //     let compName = varPropertyValue
          //       .substring(getProperty.length)
          //       .split(' ')[0];
          //     componentProperty = varPropertyValue
          //       .substring(getProperty.length + compName.length + 2)
          //       .split(' ')[0];
          //     propertyValue = {
          //       component: compName,
          //       property: componentProperty,
          //     };
          //     /* From a global variable */
          //   } else if (varPropertyValue.startsWith(getGlobalVarValue)) {
          //     let varName = varPropertyValue
          //       .substring(getGlobalVarValue.length + 1)
          //       .split(' ')[0];
          //     propertyValue = { globalVariable: varName };
          //     /* From a local variable */
          //   } else if (varPropertyValue.startsWith(getScopeVarValue)) {
          //     let varName = varPropertyValue
          //       .substring(getScopeVarValue.length + 1)
          //       .split(' ')[0];
          //     propertyValue = { localVariable: varName };
          //     /* Or plain value */
          //   } else {
          //     componentProperty = varPropertyValue.split(" '")[0];
          //     let propertyType = varPropertyValue.substring(
          //       componentProperty.length + 2
          //     );
          //     if (propertyType === 'number') {
          //       propertyValue = parseInt(componentProperty);
          //     } else if (propertyType === 'text') {
          //       propertyValue = replaceQuotes(componentProperty);
          //     } else {
          //       propertyValue = componentProperty;
          //     }
          //   }
          //   commandInfo = {
          //     commandType: dict[key],
          //     componentAction: componentNameAction,
          //     propertyAction: componentPropertyAction,
          //     propertyValue: propertyValue,
          //   };
          //   /* Checks if command is Set Global Variable Value Type
          // and returns object with values to be set */
        } else if (dict[key] === 'set-global-var-value') {
          //   let globalVariableName = commands
          //     .substring(i + key.length + 1)
          //     .split(' ')[0];
          //   let globalVariableValue = commands
          //     .substring(i + key.length + globalVariableName.length + 1)
          //     .split(')(')[0];
          //   if (globalVariableValue.startsWith(operationIndicator)) {
          //     const operation = getOperation(globalVariableValue);
          //     commandInfo = {
          //       commandType: dict[key],
          //       globalVariableAction: globalVariableName,
          //       globalVariableValue: operation,
          //     };
          //   } else {
          //     commandInfo = {
          //       commandType: dict[key],
          //       globalVariableAction: globalVariableName,
          //       globalVariableValue: globalVariableValue,
          //     };
          //   }
          //   /* Checks if command is Declare Scope Variable Type
          // and returns object with values to be set */
        } else if (dict[key] === 'declare-local-variable') {
          // let localVariableName = commands
          //   .substring(i + key.length + 1)
          //   .split(' ')[0];
          // commandInfo = {
          //   commandType: dict[key],
          //   localVariableAction: localVariableName,
          // };
          // //console.log(localVariableName);
          // //console.log('variável');
        } //else if (!isElseIf) {
        // if (dict[key] === 'opening-if') {
        //   for (let j = 0; j < commands.length; j++) {
        //     let newCommmandText = commands.substring(j);
        //     let temporaryText = newCommmandText
        //       .substring(j + key.length)
        //       .split('(begin')[0];
        //     let conditionText = '';
        //     /*if (temporaryText.startsWith('(call-yail')) {
        //       conditionText = temporaryText;
        //       condition = getOperation(conditionText);
        //     }*/
        //     let ifCommands,
        //       elseIfCommands,
        //       elseCommands = '';

        //     if (!isElseIf) {
        //       if (newCommmandText.startsWith('(call-yail')) {
        //         conditionText = newCommmandText.split(' (begin')[0];
        //         let condition = getOperation(conditionText);
        //         console.log(condition);
        //         if (
        //           newCommmandText
        //             .substring(conditionText.length)
        //             .startsWith(' (begin   ')
        //         ) {
        //           ifCommands = newCommmandText.substring(12).split(')) (')[0];
        //           //console.log('if: ' + conditionText);
        //           console.log(getBlocksCommands(ifCommands));
        //           //getBlocksCommands(newCommmandText);
        //         }
        //       }
        //     }

        //     if (newCommmandText.startsWith('(begin (if')) {
        //       conditionText = newCommmandText
        //         .substring(11)
        //         .split('(begin')[0];
        //       let condition = getOperation(conditionText);
        //       console.log(condition);
        //       //console.log(condition);
        //       isElseIf = true;
        //       elseIfCommands = newCommmandText
        //         .substring(20 + conditionText.length)
        //         .split(')) (')[0];
        //       //console.log('else-if: ' + conditionText);
        //       console.log(getBlocksCommands(elseIfCommands));
        //     }

        //     if (newCommmandText.startsWith(')) (begin   ', 0)) {
        //       //console.log('ELSE');
        //       elseCommands = newCommmandText.substring(12).split('))))')[0];
        //       //onsole.log('else:');
        //       console.log(getBlocksCommands(elseCommands));
        //       //isElse = true;
        //       //getBlocksCommands(newCommmandText);
        //     }
        //   }
        // }
        //  }
        /* Adds all objects parsed from commmand into an array */

        allCommands.push(commandInfo);
        commandInfo = {};
      }
    });
  }
  return allCommands;
};

const replaceQuotes = (value) => {
  let replacedQuotesValue = value.replaceAll('\\"', '');
  return replacedQuotesValue;
};

export { getBlocksCommands };
