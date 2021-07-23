import { getOperation } from './mathCommandsParser';

const dict = [];

const getProperty = "(get-property '";
const getGlobalVarValue = '(get-var g';
const getScopeVarValue = '(lexical-value ';
const operationIndicator = ' (call-yail-primitive';
let componentProperty = '';
let commandInfo = {};
let commandsSetProperty = [];
//let allCommands = [];

dict["(set-and-coerce-property! '"] = 'set-property';
dict['(set-var! g'] = 'set-global-var-value';
dict['(let ( ('] = 'declare-scope-variable';

//(let ( ($y2 (get-var g$y))  )   (forrange $number (begin   (set-lexical! $y2 (call-yail-primitive * (*list-for-runtime* (get-var g$y) (lexical-value $number) ) '(number number ) \"*\"))(set-and-coerce-property! 'L2 'Text (lexical-value $y2) 'text)(set-and-coerce-property! 'HA1 'BackgroundColor -16776961 'number)(set-and-coerce-property! 'VA2 'BackgroundColor -39424 'number)) 1 5 1)
//"(set-and-coerce-property! 'L1 'Text (get-var g$x) 'text)(set-and-coerce-property! 'TB1 'Text (get-property 'L1 'Text) 'text)(set-and-coerce-property! 'TB1 'BackgroundColor -4144960 'number)(set-var! g$x (call-yail-primitive - (*list-for-runtime* (get-var g$x) 1) '(number number) \"-\")"

const getBlocksCommands = (commands) => {
  let allCommands = [];

  for (let i = 0; i < commands.length; i++) {
    Object.keys(dict).forEach((key) => {
      if (commands.startsWith(key, i)) {
        /* Checks if command is Set Property Type 
        and returns object with values to be set */
        if (dict[key] === 'set-property') {
          /* Return component where action will be take place */
          let componentNameAction = commands
            .substring(i + key.length)
            .split(' ')[0];

          /* Return which property will be set on action */
          let componentPropertyAction = commands
            .substring(i + key.length + componentNameAction.length + 2)
            .split(' ')[0];

          /*Return value of property to be set on action */
          let varPropertyValue = commands
            .substring(
              i +
                key.length +
                componentNameAction.length +
                2 +
                componentPropertyAction.length +
                1
            )
            .split(')')[0];

          let propertyValue = '';
          /* Checks if property value comes from another component */
          if (varPropertyValue.startsWith(getProperty)) {
            let compName = varPropertyValue
              .substring(getProperty.length)
              .split(' ')[0];

            componentProperty = varPropertyValue
              .substring(getProperty.length + compName.length + 2)
              .split(' ')[0];

            propertyValue = {
              component: compName,
              property: componentProperty,
            };
            /* From a global variable */
          } else if (varPropertyValue.startsWith(getGlobalVarValue)) {
            let varName = varPropertyValue
              .substring(getGlobalVarValue.length + 1)
              .split(' ')[0];

            propertyValue = { globalVariable: varName };
            /* From a scoped variable */
          } else if (varPropertyValue.startsWith(getScopeVarValue)) {
            let varName = varPropertyValue
              .substring(getScopeVarValue.length + 1)
              .split(' ')[0];

            propertyValue = { scopeVariable: varName };
            /* Or plain value */
          } else {
            componentProperty = varPropertyValue.split(' ')[0];

            propertyValue = componentProperty;
          }
          commandInfo = {
            commandType: dict[key],
            componentAction: componentNameAction,
            propertyAction: componentPropertyAction,
            propertyValue: propertyValue,
          };

          /* Checks if command is Set Global Variable Value Type 
        and returns object with values to be set */
        } else if (dict[key] === 'set-global-var-value') {
          let globalVariableName = commands
            .substring(i + key.length + 1)
            .split(' ')[0];

          let globalVariableValue = commands
            .substring(i + key.length + globalVariableName.length + 1)
            .split(')(')[0];
          if (globalVariableValue.startsWith(operationIndicator)) {
            const operation = getOperation(globalVariableValue);
            commandInfo = {
              commandType: dict[key],
              globalVariableAction: globalVariableName,
              globalVariableValue: operation,
            };
          } else {
            commandInfo = {
              commandType: dict[key],
              globalVariableAction: globalVariableName,
              globalVariableValue: globalVariableValue,
            };
          }

          /* Checks if command is Declare Scope Variable Type 
        and returns object with values to be set */
        } else if (dict[key] === 'declare-scope-variable') {
          let scopeVariableName = commands
            .substring(i + key.length + 1)
            .split(' ')[0];
          commandInfo = {
            commandType: dict[key],
            scopeVariableAction: scopeVariableName,
          };
          console.log(scopeVariableName);
          console.log('variável');
        }
        /* Adds all objects parsed from commmand into an array */

        allCommands.push(commandInfo);
        commandInfo = {};
      }
    });
  }
  return allCommands;
};

export { getBlocksCommands };
